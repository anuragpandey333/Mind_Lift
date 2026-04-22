import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewLogin = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isToggled, setIsToggled] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    setIsToggled(theme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = !isToggled
    setIsToggled(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Attempting login with:', formData.email)
      console.log('API URL:', import.meta.env.VITE_API_URL)
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)
      console.log('Login successful:', response.data)
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('isNewUser', 'false')
      setIsAuthenticated(true)
      
      // Navigate to dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Login error:', err)
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Make sure backend is running on localhost:5001')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 border transition-all duration-500 ${
        isToggled ? 'bg-[#000000]/90 border-[#4A70A9]/30' : 'bg-white/90 border-[#8FABD4]/20'
      }`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-110 ${
                isToggled 
                  ? 'from-[#4A70A9] to-[#8FABD4] rotate-180' 
                  : 'from-[#8FABD4] to-[#4A70A9] rotate-0'
              }`}
            >
              <svg className={`w-7 h-7 text-white transition-all duration-500 ${
                isToggled ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </div>
          <h1 className={`text-3xl font-bold bg-clip-text text-transparent mb-2 ${
            isToggled 
              ? 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9]' 
              : 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4]'
          }`}>MindLift</h1>
          <p className={`font-medium ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Welcome back to your wellness journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Email</label>
            <input
              type="email"
              required
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000]/40 text-[#8FABD4] placeholder-[#8FABD4]/60' 
                  : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Password</label>
            <input
              type="password"
              required
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000]/40 text-[#8FABD4] placeholder-[#8FABD4]/60' 
                  : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50 transition-all duration-300 transform hover:scale-105 ${
              isToggled 
                ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' 
                : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className={`mt-6 text-center text-sm ${
          isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
        }`}>
          Don't have an account?{' '}
          <Link to="/signup" className={`font-semibold ${
            isToggled ? 'text-[#4A70A9] hover:text-[#4A70A9]/80' : 'text-[#8FABD4] hover:text-[#8FABD4]/80'
          }`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default NewLogin