import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function PublicRoute() {
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return <p className='page-message'>Loading session...</p>
  }

  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />
}

export default PublicRoute
