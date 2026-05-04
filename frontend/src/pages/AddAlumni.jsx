import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'

const initialForm = { name: '', email: '', phone: '', dob: '', gender: 'Male' }

const AddAlumni = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      setSuccess('')
      await axiosClient.post('/alumni', form)
      setSuccess('Alumni added successfully.')
      setForm(initialForm)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0">Add Alumni</h4>
        <Link className="btn btn-outline-secondary" to="/alumni">
          View Alumni List
        </Link>
      </div>

      <AlertMessage type="success" message={success} onClose={() => setSuccess('')} />
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
              {loading ? 'Saving...' : 'Add Alumni'}
            </button>
            <Link className="btn btn-outline-secondary" to="/alumni">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {loading ? <LoadingSpinner /> : null}
    </div>
  )
}

export default AddAlumni
