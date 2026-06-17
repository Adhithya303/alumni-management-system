import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

const Companies = () => {
  const { user } = useAuth()
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [showAddCompany, setShowAddCompany] = useState(false)
  const [form, setForm] = useState({ company_name: '', industry: '', location: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true)
        const response = await axiosClient.get('/companies')
        setCompanies(response.data.data || [])
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'An error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadCompanies()
  }, [])

  const validate = () => {
    const nextErrors = {}
    if (!form.company_name.trim()) nextErrors.company_name = 'Company name is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const addCompany = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setActionLoading(true)
      setError('')
      const response = await axiosClient.post('/companies', form)
      const newCompany = { company_id: response.data.data?.company_id, ...form }
      setCompanies((prev) => [newCompany, ...prev])
      setForm({ company_name: '', industry: '', location: '' })
      setErrors({})
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

      {user?.role === 'admin' ? (
        <div className="card p-3 mb-3">
          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            onClick={() => setShowAddCompany((prev) => !prev)}
          >
            {showAddCompany ? 'Hide Add Company' : 'Add Company'}
          </button>
          {showAddCompany ? (
            <form onSubmit={addCompany}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    className="form-control"
                    value={form.company_name}
                    onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  />
                  {errors.company_name ? <div className="text-danger small">{errors.company_name}</div> : null}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Industry</label>
                  <input
                    className="form-control"
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                Add Company
              </button>
            </form>
          ) : null}
        </div>
      ) : null}

      <div className="card p-3">
        <h5 className="mb-3">Companies</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Industry</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company.company_id}>
                  <td>{index + 1}</td>
                  <td>{company.company_name}</td>
                  <td>{company.industry || '—'}</td>
                  <td>{company.location || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Companies
