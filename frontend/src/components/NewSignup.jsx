import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../useTheme'

const NewSignup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { isToggled, toggleTheme } = useTheme()

  const bg = isToggled ? '#0f1117' : '#F8FAFC'
  const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'
  const border = isToggled ? '#2a2d3a' : '#BCCCDC'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#9AA6B2'
  const hover = isToggled ? '#252836' : '#D9EAFD'
  const activeColor = isToggled ? '#3b82f6' : '#BCCCDC'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('isNewUser', 'true')
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#F8FAFC] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 border transition-all duration-500 ${
        isToggled ? 'bg-[#000000]/90 border-[#BCCCDC]/30' : 'bg-white/90 border-[#D9EAFD]/20'
      }`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <button 
              onClick={toggleTheme}
              className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#4A70A9] to-[#5A6F8C] rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-110 ${
                isToggled ? 'rotate-180' : 'rotate-0'
              }`}
            >
              <svg className={`w-7 h-7 text-white transition-all duration-500 ${
                isToggled ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9] mb-2">MindLift</h1>
          <p className={`font-medium ${
            isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
          }`}>Start your wellness journey today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Name</label>
            <input
              type="text"
              required
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#BCCCDC]/30 focus:ring-[#BCCCDC] bg-[#000000]/40 text-[#D9EAFD] placeholder-[#D9EAFD]/60' 
                  : 'border-[#D9EAFD]/30 focus:ring-[#D9EAFD] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Email</label>
            <input
              type="email"
              required
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#BCCCDC]/30 focus:ring-[#BCCCDC] bg-[#000000]/40 text-[#D9EAFD] placeholder-[#D9EAFD]/60' 
                  : 'border-[#D9EAFD]/30 focus:ring-[#D9EAFD] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Password</label>
            <input
              type="password"
              required
              minLength="6"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#BCCCDC]/30 focus:ring-[#BCCCDC] bg-[#000000]/40 text-[#D9EAFD] placeholder-[#D9EAFD]/60' 
                  : 'border-[#D9EAFD]/30 focus:ring-[#D9EAFD] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
            }`}>Confirm Password</label>
            <input
              type="password"
              required
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#BCCCDC]/30 focus:ring-[#BCCCDC] bg-[#000000]/40 text-[#D9EAFD] placeholder-[#D9EAFD]/60' 
                  : 'border-[#D9EAFD]/30 focus:ring-[#D9EAFD] bg-white text-[#000000] placeholder-gray-500'
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                ? 'bg-[#BCCCDC] hover:bg-[#BCCCDC]/90' 
                : 'bg-[#1a202c] hover:bg-[#2d3748]'
            }`}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className={`mt-6 text-center text-sm ${
          isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
        }`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-semibold ${
            isToggled ? 'text-[#BCCCDC] hover:text-[#BCCCDC]/80' : 'text-[#1a202c] underline hover:text-[#4A70A9]'
          }`}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default NewSignup