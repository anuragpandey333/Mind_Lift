import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const GoogleCallback = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const token = urlParams.get('token')
    const userParam = urlParams.get('user')

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam))
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isNewUser', 'false')
        setIsAuthenticated(true)
        navigate('/')
      } catch (error) {
        console.error('Error parsing user data:', error)
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [location, navigate, setIsAuthenticated])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFECE3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A70A9] mx-auto mb-4"></div>
        <p className="text-[#4A70A9] font-medium">Completing Google sign-in...</p>
      </div>
    </div>
  )
}

export default GoogleCallback