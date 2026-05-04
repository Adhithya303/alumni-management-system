import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AlumniList from './pages/AlumniList'
import AlumniDetail from './pages/AlumniDetail'
import AddAlumni from './pages/AddAlumni'
import EditAlumni from './pages/EditAlumni'
import Events from './pages/Events'
import Companies from './pages/Companies'

const titleMap = {
  '/': 'Dashboard',
  '/alumni': 'Alumni',
  '/alumni/add': 'Add Alumni',
  '/events': 'Events',
  '/companies': 'Companies',
}

const Layout = () => {
  const location = useLocation()
  const path = location.pathname
  const title = titleMap[path] || (path.startsWith('/alumni/') ? 'Alumni Details' : 'Dashboard')

  return (
    <>
      <Sidebar />
      <Navbar title={title} />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  )
}

const AdminRoute = ({ children }) => {
  const { user } = useAuth()

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace state={{ message: 'Admin access required.' }} />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/alumni" element={<AlumniList />} />
            <Route
              path="/alumni/add"
              element={
                <AdminRoute>
                  <AddAlumni />
                </AdminRoute>
              }
            />
            <Route path="/alumni/:id" element={<AlumniDetail />} />
            <Route
              path="/alumni/:id/edit"
              element={
                <AdminRoute>
                  <EditAlumni />
                </AdminRoute>
              }
            />
            <Route path="/events" element={<Events />} />
            <Route path="/companies" element={<Companies />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
