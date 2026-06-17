import { useAuth } from '../context/AuthContext'

const Navbar = ({ title }) => {
  const { user, logout } = useAuth()
  const roleClass = user?.role === 'admin' ? 'badge-role-admin' : 'badge-role-alumni'

  return (
    <div className="navbar-top d-flex align-items-center justify-content-between">
      <h4 className="m-0 fw-bold">{title}</h4>
      <div className="d-flex align-items-center gap-3">
        <div className="text-end">
          <div className="fw-semibold">{user?.name || user?.username}</div>
          <span className={`badge ${roleClass}`}>{user?.role || 'alumni'}</span>
        </div>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
