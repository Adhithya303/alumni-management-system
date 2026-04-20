import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <h1>Alumni Management System</h1>
      <div className="navbar-user">
        <span>{user?.name || user?.username}</span>
        <button type="button" onClick={logout} className="danger-btn">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
