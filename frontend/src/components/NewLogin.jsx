import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../useTheme'

const NewLogin = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
          }`}>Welcome back to your wellness journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#BCCCDC]/30 focus:ring-[#BCCCDC] bg-[#000000]/40 text-[#D9EAFD] placeholder-[#D9EAFD]/60' 
                  : 'border-[#D9EAFD]/30 focus:ring-[#D9EAFD] bg-white text-[#000000] placeholder-gray-500'
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
                ? 'bg-[#BCCCDC] hover:bg-[#BCCCDC]/90' 
                : 'bg-[#1a202c] hover:bg-[#2d3748]'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className={`flex-1 h-px ${isToggled ? 'bg-[#BCCCDC]/30' : 'bg-[#D9EAFD]'}`} />
            <span className={`text-sm ${isToggled ? 'text-[#D9EAFD]/60' : 'text-[#9AA6B2]'}`}>Or</span>
            <div className={`flex-1 h-px ${isToggled ? 'bg-[#BCCCDC]/30' : 'bg-[#D9EAFD]'}`} />
          </div>

          {/* Google OAuth */}
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold border transition-all duration-300 transform hover:scale-105 ${
              isToggled
                ? 'bg-[#000000]/40 border-[#BCCCDC]/30 text-[#D9EAFD] hover:bg-[#BCCCDC]/10'
                : 'bg-white border-[#D9EAFD] text-[#1a202c] hover:bg-[#F8FAFC]'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </a>
        </form>

        <p className={`mt-6 text-center text-sm ${
          isToggled ? 'text-[#D9EAFD]' : 'text-[#000000]'
        }`}>
          Don't have an account?{' '}
          <Link to="/signup" className={`font-semibold ${
            isToggled ? 'text-[#BCCCDC] hover:text-[#BCCCDC]/80' : 'text-[#1a202c] underline hover:text-[#4A70A9]'
          }`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default NewLogin