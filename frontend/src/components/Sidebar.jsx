import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/alumni', label: 'Alumni' },
    { to: '/education', label: 'Education' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/skills', label: 'Skills' },
    { to: '/events', label: 'Events' },
  ]

  return (
    <aside className="sidebar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'side-link active' : 'side-link')}
          end={link.to === '/'}
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  )
}

export default Sidebar
