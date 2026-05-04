import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/helpers'

const AlumniList = () => {
  const { user } = useAuth()
  const [alumni, setAlumni] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        setLoading(true)
        const response = await axiosClient.get('/alumni')
        setAlumni(response.data.data || [])
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'An error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadAlumni()
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return alumni
    return alumni.filter((item) => {
      const name = item.name?.toLowerCase() || ''
      const email = item.email?.toLowerCase() || ''
      return name.includes(term) || email.includes(term)
    })
  }, [alumni, search])

  const removeAlumni = async (alumniId) => {
    const confirmed = window.confirm('Are you sure you want to delete this alumni?')
    if (!confirmed) return

    try {
      setActionLoading(true)
      await axiosClient.delete(`/alumni/${alumniId}`)
      setAlumni((prev) => prev.filter((item) => item.alumni_id !== alumniId))
      setSuccess('Alumni deleted successfully.')
      setError('')
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
      setSuccess('')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="fade-in">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Alumni</h4>
          <div className="text-muted">Showing {filtered.length} alumni</div>
        </div>
        {user?.role === 'admin' ? (
          <Link to="/alumni/add" className="btn btn-primary">
            Add Alumni
          </Link>
        ) : null}
      </div>

      <AlertMessage type="success" message={success} onClose={() => setSuccess('')} />
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />
      {actionLoading ? <LoadingSpinner /> : null}

      <div className="card p-3 mb-3">
        <input
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card p-3">
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.alumni_id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone || '—'}</td>
                  <td>{item.gender || '—'}</td>
                  <td>{formatDate(item.dob)}</td>
                  <td className="d-flex gap-2">
                    <Link className="btn btn-sm btn-outline-primary" to={`/alumni/${item.alumni_id}`}>
                      View
                    </Link>
                    {user?.role === 'admin' ? (
                      <Link className="btn btn-sm btn-outline-secondary" to={`/alumni/${item.alumni_id}/edit`}>
                        Edit
                      </Link>
                    ) : null}
                    {user?.role === 'admin' ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeAlumni(item.alumni_id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AlumniList
