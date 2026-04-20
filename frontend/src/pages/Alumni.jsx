import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/client'
import Modal from '../components/Modal'
import Table from '../components/Table'
import FormField from '../components/FormField'

const Alumni = () => {
  const [alumni, setAlumni] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const alumniRows = useMemo(() => {
    const map = new Map()
    alumni.forEach((item) => {
      if (!map.has(item.alumni_id)) {
        map.set(item.alumni_id, item)
      }
    })
    return Array.from(map.values())
  }, [alumni])

  const fetchAlumni = async () => {
    const response = await api.get('/alumni')
    setAlumni(response.data.data || [])
  }

  useEffect(() => {
    fetchAlumni()
  }, [])

  const onSubmit = async (values) => {
    await api.post('/alumni', values)
    setOpen(false)
    reset()
    await fetchAlumni()
  }

  const loadProfile = async (alumniId) => {
    if (expandedId === alumniId) {
      setExpandedId(null)
      setSelectedProfile(null)
      return
    }

    const response = await api.get(`/alumni/${alumniId}`)
    setSelectedProfile(response.data.data)
    setExpandedId(alumniId)
  }

  const removeAlumni = async (alumniId) => {
    await api.delete(`/alumni/${alumniId}`)
    if (expandedId === alumniId) {
      setExpandedId(null)
      setSelectedProfile(null)
    }
    await fetchAlumni()
  }

  return (
    <div className="page">
      <div className="inline-head">
        <h2>Alumni</h2>
        <button type="button" onClick={() => setOpen(true)}>Add Alumni</button>
      </div>

      <Table
        columns={['Name', 'Email', 'Phone', 'Degree', 'Job', 'Company', 'Actions']}
        data={alumniRows}
        renderRow={(item) => (
          <>
            <tr key={item.alumni_id}>
              <td><button className="link-btn" type="button" onClick={() => loadProfile(item.alumni_id)}>{item.name}</button></td>
              <td>{item.email}</td>
              <td>{item.phone || '-'}</td>
              <td>{item.degree || '-'}</td>
              <td>{item.job_title || '-'}</td>
              <td>{item.company_name || '-'}</td>
              <td>
                <button type="button" className="danger-btn" onClick={() => removeAlumni(item.alumni_id)}>Delete</button>
              </td>
            </tr>
            {expandedId === item.alumni_id && selectedProfile ? (
              <tr key={`details-${item.alumni_id}`}>
                <td colSpan={7}>
                  <div className="details-grid">
                    <div><strong>Education:</strong> {selectedProfile.education?.map((e) => `${e.degree} (${e.graduation_year})`).join(', ') || 'N/A'}</div>
                    <div><strong>Jobs:</strong> {selectedProfile.jobs?.map((j) => `${j.job_title} @ ${j.company_name || '-'}`).join(', ') || 'N/A'}</div>
                    <div><strong>Skills:</strong> {selectedProfile.skills?.map((s) => s.skill_name).join(', ') || 'N/A'}</div>
                    <div><strong>Events:</strong> {selectedProfile.events?.map((e) => `${e.event_name} (${e.role})`).join(', ') || 'N/A'}</div>
                  </div>
                </td>
              </tr>
            ) : null}
          </>
        )}
      />

      <Modal open={open} onClose={() => setOpen(false)} title="Add Alumni">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Name" register={register} name="name" required />
          <FormField label="Email" type="email" register={register} name="email" required />
          <FormField label="Phone" register={register} name="phone" />
          <FormField label="Date of Birth" type="date" register={register} name="dob" />
          <FormField
            label="Gender"
            type="select"
            register={register}
            name="gender"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
          />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  )
}

export default Alumni
