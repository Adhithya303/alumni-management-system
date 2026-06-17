import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'Prefer not to say',
  username: '',
  password: '',
  confirmPassword: '',
  role: 'alumni',
}

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({ type: 'danger', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => navigate('/login'), 2000)
    return () => clearTimeout(timer)
  }, [success, navigate])

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.email.trim()) nextErrors.email = 'Email is required'
    if (!form.username.trim() || form.username.length < 4) {
      nextErrors.username = 'Username must be at least 4 characters'
    }
    if (!form.password || form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      setAlert({ type: 'danger', message: '' })
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        dob: form.dob || null,
        gender: form.gender,
        username: form.username,
        password: form.password,
        role: form.role,
      }
      await axiosClient.post('/auth/register', payload)
      setSuccess('Registration successful. Redirecting to login...')
      setForm(initialForm)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setAlert({ type: 'danger', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="w-100" style={{ maxWidth: 520 }}>
        <div className="card p-4">
          <h4 className="mb-3">Register</h4>
          <AlertMessage type="success" message={success} onClose={() => setSuccess('')} />
          <AlertMessage type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, message: '' })} />
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
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
                  required
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
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="alumni">alumni</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
                {errors.username ? <div className="text-danger small">{errors.username}</div> : null}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                {errors.password ? <div className="text-danger small">{errors.password}</div> : null}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                />
                {errors.confirmPassword ? (
                  <div className="text-danger small">{errors.confirmPassword}</div>
                ) : null}
              </div>
            </div>
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : null}
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          {loading ? <LoadingSpinner /> : null}
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
