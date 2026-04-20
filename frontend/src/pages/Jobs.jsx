import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/client'
import FormField from '../components/FormField'
import Table from '../components/Table'

const Jobs = () => {
  const [alumni, setAlumni] = useState([])
  const [companies, setCompanies] = useState([])
  const [selectedAlumni, setSelectedAlumni] = useState('')
  const [jobs, setJobs] = useState([])
  const { register, handleSubmit, reset } = useForm()

  const alumniOptions = useMemo(() => {
    const map = new Map()
    alumni.forEach((item) => {
      if (!map.has(item.alumni_id)) map.set(item.alumni_id, item.name)
    })
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [alumni])

  const companyOptions = companies.map((item) => ({ value: item.company_id, label: item.company_name }))

  useEffect(() => {
    const loadBaseData = async () => {
      const [alumniRes, companiesRes] = await Promise.all([api.get('/alumni'), api.get('/companies')])
      setAlumni(alumniRes.data.data || [])
      setCompanies(companiesRes.data.data || [])
    }

    loadBaseData()
  }, [])

  const fetchJobs = async (alumniId) => {
    if (!alumniId) {
      setJobs([])
      return
    }
    const response = await api.get(`/jobs/${alumniId}`)
    setJobs(response.data.data || [])
  }

  useEffect(() => {
    fetchJobs(selectedAlumni)
  }, [selectedAlumni])

  const onSubmit = async (values) => {
    await api.post('/jobs', values)
    reset({ ...values, job_title: '', start_date: '', end_date: '' })
    await fetchJobs(values.alumni_id)
    setSelectedAlumni(values.alumni_id)
  }

  const removeJob = async (jobId) => {
    await api.delete(`/jobs/${jobId}`)
    await fetchJobs(selectedAlumni)
  }

  return (
    <div className="page">
      <h2>Jobs</h2>
      <div className="card">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Alumni" type="select" register={register} name="alumni_id" required options={alumniOptions} />
          <FormField label="Company" type="select" register={register} name="company_id" required options={companyOptions} />
          <FormField label="Job Title" register={register} name="job_title" required />
          <FormField label="Start Date" type="date" register={register} name="start_date" />
          <FormField label="End Date" type="date" register={register} name="end_date" />
          <button type="submit">Add Job</button>
        </form>
      </div>

      <div className="card">
        <label className="field">
          <span>View jobs for alumni</span>
          <select value={selectedAlumni} onChange={(e) => setSelectedAlumni(e.target.value)}>
            <option value="">Select</option>
            {alumniOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <Table
          columns={['Title', 'Company', 'Start', 'End', 'Action']}
          data={jobs}
          renderRow={(item) => (
            <tr key={item.job_id}>
              <td>{item.job_title}</td>
              <td>{item.company_name || '-'}</td>
              <td>{item.start_date ? new Date(item.start_date).toLocaleDateString() : '-'}</td>
              <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : 'Present'}</td>
              <td><button type="button" className="danger-btn" onClick={() => removeJob(item.job_id)}>Delete</button></td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default Jobs
