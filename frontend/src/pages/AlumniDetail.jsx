import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/helpers'

const AlumniDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [alumni, setAlumni] = useState(null)
  const [companies, setCompanies] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const [educationForm, setEducationForm] = useState({
    degree: '',
    department: '',
    college_name: '',
    graduation_year: '',
  })
  const [educationErrors, setEducationErrors] = useState({})
  const [jobForm, setJobForm] = useState({
    company_id: '',
    job_title: '',
    start_date: '',
    end_date: '',
  })
  const [jobErrors, setJobErrors] = useState({})
  const [skillForm, setSkillForm] = useState({ skill_id: '' })
  const [skillError, setSkillError] = useState('')
  const [showEducationForm, setShowEducationForm] = useState(false)
  const [showJobForm, setShowJobForm] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [alumniRes, companiesRes, skillsRes] = await Promise.all([
          axiosClient.get(`/alumni/${id}`),
          axiosClient.get('/companies'),
          axiosClient.get('/skills'),
        ])
        setAlumni(alumniRes.data.data)
        setCompanies(companiesRes.data.data || [])
        setSkills(skillsRes.data.data || [])
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'An error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const addEducation = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!educationForm.degree) nextErrors.degree = 'Degree is required'
    if (!educationForm.department) nextErrors.department = 'Department is required'
    if (!educationForm.college_name) nextErrors.college_name = 'College name is required'
    if (!educationForm.graduation_year) nextErrors.graduation_year = 'Graduation year is required'
    setEducationErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setActionLoading(true)
      setError('')
      const payload = { alumni_id: id, ...educationForm }
      const response = await axiosClient.post('/education', payload)
      const eduId = response.data.data?.edu_id
      setAlumni((prev) => ({
        ...prev,
        education: [
          ...(prev.education || []),
          { edu_id: eduId, ...educationForm },
        ],
      }))
      setEducationForm({ degree: '', department: '', college_name: '', graduation_year: '' })
      setEducationErrors({})
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const deleteEducation = async (eduId) => {
    const confirmed = window.confirm('Delete this education record?')
    if (!confirmed) return

    try {
      setActionLoading(true)
      await axiosClient.delete(`/education/${eduId}`)
      setAlumni((prev) => ({
        ...prev,
        education: (prev.education || []).filter((item) => item.edu_id !== eduId),
      }))
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const addJob = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!jobForm.company_id) nextErrors.company_id = 'Company is required'
    if (!jobForm.job_title) nextErrors.job_title = 'Job title is required'
    setJobErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    try {
      setActionLoading(true)
      setError('')
      const payload = { alumni_id: id, ...jobForm }
      const response = await axiosClient.post('/jobs', payload)
      const jobId = response.data.data?.job_id
      const company = companies.find((c) => String(c.company_id) === String(jobForm.company_id))
      setAlumni((prev) => ({
        ...prev,
        jobs: [
          ...(prev.jobs || []),
          {
            job_id: jobId,
            company_id: jobForm.company_id,
            company_name: company?.company_name,
            industry: company?.industry,
            location: company?.location,
            job_title: jobForm.job_title,
            start_date: jobForm.start_date || null,
            end_date: jobForm.end_date || null,
          },
        ],
      }))
      setJobForm({ company_id: '', job_title: '', start_date: '', end_date: '' })
      setJobErrors({})
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const deleteJob = async (jobId) => {
    const confirmed = window.confirm('Delete this job record?')
    if (!confirmed) return

    try {
      setActionLoading(true)
      await axiosClient.delete(`/jobs/${jobId}`)
      setAlumni((prev) => ({
        ...prev,
        jobs: (prev.jobs || []).filter((item) => item.job_id !== jobId),
      }))
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const addSkill = async () => {
    if (!skillForm.skill_id) {
      setSkillError('Select a skill to add.')
      return
    }

    try {
      setActionLoading(true)
      setError('')
      await axiosClient.post(`/alumni/${id}/skills`, { skill_id: skillForm.skill_id })
      setSkillError('')
      const skill = skills.find((s) => String(s.skill_id) === String(skillForm.skill_id))
      setAlumni((prev) => ({
        ...prev,
        skills: [
          ...(prev.skills || []),
          { skill_id: skillForm.skill_id, skill_name: skill?.skill_name },
        ],
      }))
      setSkillForm({ skill_id: '' })
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const removeSkill = async (skillId) => {
    const confirmed = window.confirm('Remove this skill?')
    if (!confirmed) return

    try {
      setActionLoading(true)
      await axiosClient.delete(`/alumni/${id}/skills/${skillId}`)
      setAlumni((prev) => ({
        ...prev,
        skills: (prev.skills || []).filter((item) => item.skill_id !== skillId),
      }))
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="fade-in">
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />
      {actionLoading ? <LoadingSpinner /> : null}

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="mb-3">Profile</h5>
            <div className="mb-2"><strong>Name:</strong> {alumni?.name}</div>
            <div className="mb-2"><strong>Email:</strong> {alumni?.email}</div>
            <div className="mb-2"><strong>Phone:</strong> {alumni?.phone || '—'}</div>
            <div className="mb-2"><strong>DOB:</strong> {formatDate(alumni?.dob)}</div>
            <div className="mb-3"><strong>Gender:</strong> {alumni?.gender || '—'}</div>
            {user?.role === 'admin' ? (
              <Link className="btn btn-outline-primary" to={`/alumni/${id}/edit`}>
                Edit Profile
              </Link>
            ) : null}
          </div>
        </div>
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <h5 className="mb-3">Education</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Degree</th>
                    <th>Department</th>
                    <th>College</th>
                    <th>Graduation Year</th>
                    {user?.role === 'admin' ? <th></th> : null}
                  </tr>
                </thead>
                <tbody>
                  {(alumni?.education || []).map((edu) => (
                    <tr key={edu.edu_id}>
                      <td>{edu.degree}</td>
                      <td>{edu.department}</td>
                      <td>{edu.college_name}</td>
                      <td>{edu.graduation_year}</td>
                      {user?.role === 'admin' ? (
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEducation(edu.edu_id)}>
                            Delete
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {user?.role === 'admin' ? (
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-outline-primary mb-2"
                  onClick={() => setShowEducationForm((prev) => !prev)}
                >
                  {showEducationForm ? 'Hide Add Education' : 'Add Education'}
                </button>
                {showEducationForm ? (
                  <form onSubmit={addEducation}>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <input
                          className="form-control"
                          placeholder="Degree"
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                        />
                        {educationErrors.degree ? (
                          <div className="text-danger small">{educationErrors.degree}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          className="form-control"
                          placeholder="Department"
                          value={educationForm.department}
                          onChange={(e) => setEducationForm({ ...educationForm, department: e.target.value })}
                        />
                        {educationErrors.department ? (
                          <div className="text-danger small">{educationErrors.department}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          className="form-control"
                          placeholder="College Name"
                          value={educationForm.college_name}
                          onChange={(e) => setEducationForm({ ...educationForm, college_name: e.target.value })}
                        />
                        {educationErrors.college_name ? (
                          <div className="text-danger small">{educationErrors.college_name}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          className="form-control"
                          placeholder="Graduation Year"
                          type="number"
                          value={educationForm.graduation_year}
                          onChange={(e) => setEducationForm({ ...educationForm, graduation_year: e.target.value })}
                        />
                        {educationErrors.graduation_year ? (
                          <div className="text-danger small">{educationErrors.graduation_year}</div>
                        ) : null}
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                      Add Education
                    </button>
                  </form>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="card p-3 mb-3">
            <h5 className="mb-3">Work History</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Location</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {user?.role === 'admin' ? <th></th> : null}
                  </tr>
                </thead>
                <tbody>
                  {(alumni?.jobs || []).map((job) => (
                    <tr key={job.job_id}>
                      <td>{job.job_title}</td>
                      <td>{job.company_name || '—'}</td>
                      <td>{job.industry || '—'}</td>
                      <td>{job.location || '—'}</td>
                      <td>{formatDate(job.start_date)}</td>
                      <td>{job.end_date ? formatDate(job.end_date) : 'Present'}</td>
                      {user?.role === 'admin' ? (
                        <td>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => deleteJob(job.job_id)}>
                            Delete
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {user?.role === 'admin' ? (
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-outline-primary mb-2"
                  onClick={() => setShowJobForm((prev) => !prev)}
                >
                  {showJobForm ? 'Hide Add Job' : 'Add Job'}
                </button>
                {showJobForm ? (
                  <form onSubmit={addJob}>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <select
                          className="form-select"
                          value={jobForm.company_id}
                          onChange={(e) => setJobForm({ ...jobForm, company_id: e.target.value })}
                        >
                          <option value="">Select Company</option>
                          {companies.map((company) => (
                            <option key={company.company_id} value={company.company_id}>
                              {company.company_name}
                            </option>
                          ))}
                        </select>
                        {jobErrors.company_id ? (
                          <div className="text-danger small">{jobErrors.company_id}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          className="form-control"
                          placeholder="Job Title"
                          value={jobForm.job_title}
                          onChange={(e) => setJobForm({ ...jobForm, job_title: e.target.value })}
                        />
                        {jobErrors.job_title ? (
                          <div className="text-danger small">{jobErrors.job_title}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          type="date"
                          className="form-control"
                          value={jobForm.start_date}
                          onChange={(e) => setJobForm({ ...jobForm, start_date: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6 mb-2">
                        <input
                          type="date"
                          className="form-control"
                          value={jobForm.end_date}
                          onChange={(e) => setJobForm({ ...jobForm, end_date: e.target.value })}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                      Add Job
                    </button>
                  </form>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="card p-3 mb-3">
            <h5 className="mb-3">Skills</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {(alumni?.skills || []).map((skill) => (
                <span key={skill.skill_id} className="badge bg-primary rounded-pill">
                  {skill.skill_name}
                  {user?.role === 'admin' ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-white ms-2 p-0"
                      onClick={() => removeSkill(skill.skill_id)}
                    >
                      ×
                    </button>
                  ) : null}
                </span>
              ))}
            </div>
            {user?.role === 'admin' ? (
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={skillForm.skill_id}
                  onChange={(e) => {
                    setSkillForm({ skill_id: e.target.value })
                    setSkillError('')
                  }}
                >
                  <option value="">Select skill</option>
                  {skills.map((skill) => (
                    <option key={skill.skill_id} value={skill.skill_id}>
                      {skill.skill_name}
                    </option>
                  ))}
                </select>
                {skillError ? <div className="text-danger small">{skillError}</div> : null}
                <button className="btn btn-primary" type="button" onClick={addSkill} disabled={actionLoading}>
                  Add Skill
                </button>
              </div>
            ) : null}
          </div>

          <div className="card p-3">
            <h5 className="mb-3">Events</h5>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {(alumni?.events || []).map((event) => (
                    <tr key={event.event_id}>
                      <td>{event.event_name}</td>
                      <td>{formatDate(event.event_date)}</td>
                      <td>{event.location || '—'}</td>
                      <td>{event.role || 'Participant'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlumniDetail
