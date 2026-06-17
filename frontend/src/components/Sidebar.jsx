import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = () => {
  const { user } = useAuth()
  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'AM'

  return (
    <aside className="sidebar">
      <div className="d-flex align-items-center gap-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle"
          style={{ width: 48, height: 48, background: '#0f2a44', color: '#fff', fontWeight: 700 }}
        >
          {initials}
        </div>
        <div>
          <div className="fw-semibold">{user?.name || 'User'}</div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{user?.username || ''}</div>
        </div>
      </div>

      <nav className="d-grid gap-1 mt-3 flex-grow-1">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link-sidebar active' : 'nav-link-sidebar')}>
          🏠 Dashboard
        </NavLink>
        <NavLink to="/alumni" className={({ isActive }) => (isActive ? 'nav-link-sidebar active' : 'nav-link-sidebar')}>
          👥 Alumni
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => (isActive ? 'nav-link-sidebar active' : 'nav-link-sidebar')}>
          🎓 Events
        </NavLink>
        <NavLink to="/companies" className={({ isActive }) => (isActive ? 'nav-link-sidebar active' : 'nav-link-sidebar')}>
          🏢 Companies
        </NavLink>

        {user?.role === 'admin' ? (
          <div className="mt-3" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
            Admin Panel
          </div>
        ) : null}
        {user?.role === 'admin' ? (
          <NavLink to="/alumni/add" className={({ isActive }) => (isActive ? 'nav-link-sidebar active' : 'nav-link-sidebar')}>
            ➕ Add Alumni
          </NavLink>
        ) : null}
      </nav>

      <div className="mt-auto fw-semibold" style={{ fontSize: '0.85rem', color: '#fff' }}>
        Alumni Management Software
      </div>
    </aside>
  )
}

export default Sidebar
