import { useEffect, useState } from 'react'
import api from '../api/client'
import Table from '../components/Table'

const Dashboard = () => {
  const [summary, setSummary] = useState({ alumni: 0, events: 0, companies: 0, skills: 0 })
  const [recentAlumni, setRecentAlumni] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const [alumniRes, eventsRes, companiesRes, skillsRes] = await Promise.all([
        api.get('/alumni'),
        api.get('/events'),
        api.get('/companies'),
        api.get('/skills'),
      ])

      const alumni = alumniRes.data.data || []
      setSummary({
        alumni: new Set(alumni.map((a) => a.alumni_id)).size,
        events: (eventsRes.data.data || []).length,
        companies: (companiesRes.data.data || []).length,
        skills: (skillsRes.data.data || []).length,
      })
      setRecentAlumni(alumni.slice(0, 5))
    }

    loadData()
  }, [])

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <div className="cards-grid">
        <div className="card"><h3>Total Alumni</h3><p>{summary.alumni}</p></div>
        <div className="card"><h3>Total Events</h3><p>{summary.events}</p></div>
        <div className="card"><h3>Total Companies</h3><p>{summary.companies}</p></div>
        <div className="card"><h3>Total Skills</h3><p>{summary.skills}</p></div>
      </div>

      <div className="card">
        <h3>Recent Alumni</h3>
        <Table
          columns={['Name', 'Email', 'Degree', 'Job Title']}
          data={recentAlumni}
          renderRow={(item) => (
            <tr key={`${item.alumni_id}-${item.email}`}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.degree || '-'}</td>
              <td>{item.job_title || '-'}</td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default Dashboard
