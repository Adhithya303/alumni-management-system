import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'

const EditAlumni = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', gender: 'Male' })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        setLoading(true)
        const response = await axiosClient.get(`/alumni/${id}`)
        const data = response.data.data
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          gender: data.gender || 'Male',
        })
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'An error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadAlumni()
  }, [id])

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      nextErrors.phone = 'Phone must be 10 digits'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      setError('')
      await axiosClient.put(`/alumni/${id}`, form)
      navigate(`/alumni/${id}`)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="fade-in">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Edit Alumni</h4>
        <Link className="btn btn-outline-secondary" to={`/alumni/${id}`}>
          Back to Profile
        </Link>
      </div>

      <AlertMessage type="danger" message={error} onClose={() => setError('')} />

      <div className="card p-4">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name ? <div className="text-danger small">{errors.name}</div> : null}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email ? <div className="text-danger small">{errors.email}</div> : null}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone ? <div className="text-danger small">{errors.phone}</div> : null}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              Save Changes
            </button>
            <Link className="btn btn-outline-secondary" to={`/alumni/${id}`}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAlumni
