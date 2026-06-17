import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.username) nextErrors.username = 'Username is required'
    if (!form.password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      setAlert('')
      const response = await axiosClient.post('/auth/login', form)
      const { token, user } = response.data.data
      login(token, user)
      navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setAlert(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="w-100" style={{ maxWidth: 420 }}>
        <h2 className="text-center mb-4">Alumni Management System</h2>
        <div className="card p-4">
          <h4 className="mb-3">Login</h4>
          <AlertMessage type="danger" message={alert} onClose={() => setAlert('')} />
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
              {errors.username ? <div className="text-danger small">{errors.username}</div> : null}
            </div>
            <div className="mb-3">
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
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : null}
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          {loading ? <LoadingSpinner /> : null}
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
