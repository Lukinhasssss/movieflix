import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { isAuthenticated, logout } from '../../utils/auth'
import './styles.scss'

const Navbar = () => {
  const [isUserLogged, setIsUserLogged] = useState({})
  const location = useLocation()

  useEffect(() => {
    const userLogged = isAuthenticated()
    setIsUserLogged(userLogged)
  }, [location])

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">MovieFlix</Link>
        {isUserLogged && (
          <div
            className="navbar-logout-button"
            onClick={ logout }
          >
            <span className="navbar-logout-button-text">
              Sair
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar