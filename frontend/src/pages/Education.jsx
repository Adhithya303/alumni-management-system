import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/client'
import FormField from '../components/FormField'
import Table from '../components/Table'

const Education = () => {
  const [alumni, setAlumni] = useState([])
  const [selectedAlumni, setSelectedAlumni] = useState('')
  const [education, setEducation] = useState([])
  const { register, handleSubmit, reset } = useForm()

  const alumniOptions = useMemo(() => {
    const map = new Map()
    alumni.forEach((item) => {
      if (!map.has(item.alumni_id)) {
        map.set(item.alumni_id, item.name)
      }
    })
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [alumni])

  useEffect(() => {
    const fetchAlumni = async () => {
      const response = await api.get('/alumni')
      setAlumni(response.data.data || [])
    }
    fetchAlumni()
  }, [])

  const fetchEducation = async (alumniId) => {
    if (!alumniId) {
      setEducation([])
      return
    }
    const response = await api.get(`/education/${alumniId}`)
    setEducation(response.data.data || [])
  }

  useEffect(() => {
    fetchEducation(selectedAlumni)
  }, [selectedAlumni])

  const onSubmit = async (values) => {
    await api.post('/education', values)
    reset({ ...values, degree: '', department: '', college_name: '', graduation_year: '' })
    await fetchEducation(values.alumni_id)
    setSelectedAlumni(values.alumni_id)
  }

  const removeEducation = async (eduId) => {
    await api.delete(`/education/${eduId}`)
    await fetchEducation(selectedAlumni)
  }

  return (
    <div className="page">
      <h2>Education</h2>
      <div className="card">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Alumni" type="select" register={register} name="alumni_id" required options={alumniOptions} />
          <FormField label="Degree" register={register} name="degree" required />
          <FormField label="Department" register={register} name="department" required />
          <FormField label="College" register={register} name="college_name" required />
          <FormField label="Graduation Year" type="number" register={register} name="graduation_year" required />
          <button type="submit">Add Education</button>
        </form>
      </div>

      <div className="card">
        <label className="field">
          <span>View records for alumni</span>
          <select value={selectedAlumni} onChange={(e) => setSelectedAlumni(e.target.value)}>
            <option value="">Select</option>
            {alumniOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <Table
          columns={['Degree', 'Department', 'College', 'Graduation Year', 'Action']}
          data={education}
          renderRow={(item) => (
            <tr key={item.edu_id}>
              <td>{item.degree}</td>
              <td>{item.department}</td>
              <td>{item.college_name}</td>
              <td>{item.graduation_year}</td>
              <td><button type="button" className="danger-btn" onClick={() => removeEducation(item.edu_id)}>Delete</button></td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default Education
