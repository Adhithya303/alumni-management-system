import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'

const Dashboard = () => {
  const location = useLocation()
  const [summary, setSummary] = useState({ alumni: 0, events: 0, companies: 0, skills: 0 })
  const [recentAlumni, setRecentAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState(location.state?.message || '')

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError('')
        const [alumniRes, eventsRes, companiesRes, skillsRes] = await Promise.all([
          axiosClient.get('/alumni'),
          axiosClient.get('/events'),
          axiosClient.get('/companies'),
          axiosClient.get('/skills'),
        ])
        const alumni = alumniRes.data.data || []
        setSummary({
          alumni: alumni.length,
          events: (eventsRes.data.data || []).length,
          companies: (companiesRes.data.data || []).length,
          skills: (skillsRes.data.data || []).length,
        })
        setRecentAlumni(alumni.slice(0, 5))
      } catch (err) {
        const messageText = err.response?.data?.message || err.message || 'An error occurred'
        setError(messageText)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="fade-in">
      <AlertMessage type="warning" message={message} onClose={() => setMessage('')} />
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Alumni', value: summary.alumni, icon: '👥', color: '#1a3c5e' },
          { label: 'Total Events', value: summary.events, icon: '🎓', color: '#2e6da4' },
          { label: 'Total Companies', value: summary.companies, icon: '🏢', color: '#1a3c5e' },
          { label: 'Total Skills', value: summary.skills, icon: '🧰', color: '#2e6da4' },
        ].map((item) => (
          <div className="col-12 col-sm-6 col-md-3" key={item.label}>
            <div className="card p-3" style={{ borderLeft: `4px solid ${item.color}` }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="display-6 fw-bold">{item.value}</div>
                  <div className="text-muted">{item.label}</div>
                </div>
                <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-3">
        <h5 className="mb-3">Recent Alumni</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentAlumni.map((item) => (
                <tr key={item.alumni_id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.gender || '—'}</td>
                  <td>
                    <Link className="btn btn-sm btn-outline-primary" to={`/alumni/${item.alumni_id}`}>
                      View
                    </Link>
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

export default Dashboard
