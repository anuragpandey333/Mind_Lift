import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [recentActivities, setRecentActivities] = useState([])
  const [stats, setStats] = useState({ daysActive: 0, moodEntries: 0, goalsAchieved: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const addActivity = (type, action) => {
    const activity = {
      id: Date.now(),
      type,
      action,
      timestamp: new Date().toLocaleString()
    }
    const existing = JSON.parse(localStorage.getItem('recentActivities') || '[]')
    const updated = [activity, ...existing].slice(0, 10)
    localStorage.setItem('recentActivities', JSON.stringify(updated))
    setRecentActivities(updated)
  }

  const deleteActivity = (activityId) => {
    const updatedActivities = recentActivities.filter(activity => activity.id !== activityId)
    setRecentActivities(updatedActivities)
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities))
  }

  const updateStats = (type, increment = true) => {
    const newStats = { ...stats }
    if (increment) {
      newStats[type] += 1
    } else {
      newStats[type] = Math.max(0, newStats[type] - 1)
    }
    setStats(newStats)
    localStorage.setItem('userStats', JSON.stringify(newStats))
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          const userData = data.user
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        } else {
          if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        // Fallback to localStorage user data
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      }
    }
    
    fetchUserData()
    
    const theme = localStorage.getItem('theme')
    const newUserFlag = localStorage.getItem('isNewUser')
    const activities = localStorage.getItem('recentActivities')
    const userStats = localStorage.getItem('userStats')
    
    setIsToggled(theme === 'dark')
    setIsNewUser(newUserFlag === 'true')
    setRecentActivities(activities ? JSON.parse(activities) : [])
    setStats(userStats ? JSON.parse(userStats) : { daysActive: 7, moodEntries: 12, goalsAchieved: 3 })
  }, [])

  useEffect(() => {
    // Clear the flag after component has rendered with the message
    if (isNewUser) {
      const timer = setTimeout(() => {
        localStorage.removeItem('isNewUser')
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isNewUser])

  const toggleTheme = () => {
    const newTheme = !isToggled
    setIsToggled(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  const features = [
    {
      title: "Mood Tracker",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: "Track your daily emotions and mental state",
      color: "#FCD8CD",
      bgColor: "bg-pink-50"
    },
    {
      title: "Mentorship",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      description: "Connect with verified mental health mentors",
      color: "#FEEBF6",
      bgColor: "bg-blue-50"
    },
    {
      title: "Fitness Tracker",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Monitor your physical wellness and activities",
      color: "#EBD6FB",
      bgColor: "bg-green-50"
    },
    {
      title: "Diet Planner",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      ),
      description: "Personalized nutrition for better mental health",
      color: "#687FE5",
      bgColor: "bg-orange-50"
    },
    {
      title: "Scheduler",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Organize tasks and manage your daily routine",
      color: "#FCD8CD",
      bgColor: "bg-violet-50"
    },
    {
      title: "AI Chatbot",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: "24/7 AI support for mental wellness guidance",
      color: "#FEEBF6",
      bgColor: "bg-teal-50"
    }
  ]

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      {/* Navigation */}
      <nav className={`backdrop-blur-md shadow-sm border-b transition-all duration-500 ${
        isToggled 
          ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
          : 'bg-[#EFECE3]/80 border-[#8FABD4]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
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
              <button 
                onClick={() => navigate('/')}
                className={`text-3xl font-semibold bg-clip-text text-transparent tracking-wider transition-all duration-500 hover:opacity-80 ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#8FABD4] via-[#4A70A9] to-[#8FABD4]' 
                    : 'bg-gradient-to-r from-[#4A70A9] via-[#8FABD4] to-[#4A70A9]'
                }`}
              >
                MindLift
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/features')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>Features</button>
              <button onClick={() => navigate('/about')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>About</button>
              <button onClick={() => navigate('/contact')} className={`font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 ${
                isToggled 
                  ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                  : 'text-[#4A70A9] hover:text-[#8FABD4]'
              }`}>Contact</button>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              <svg className={`w-6 h-6 ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/profile')}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      isToggled ? 'bg-[#4A70A9]/20 hover:bg-[#4A70A9]/30' : 'bg-[#8FABD4]/10 hover:bg-[#8FABD4]/20'
                    }`}
                  >
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${
                        isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden sm:block">
                      <p className={`font-semibold text-sm ${
                        isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
                      }`}>{user.name}</p>
                      <p className={`text-xs ${
                        isToggled ? 'text-[#8FABD4]/70' : 'text-[#4A70A9]/70'
                      }`}>{user.email}</p>
                    </div>
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`text-white px-3 sm:px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm ${
                      isToggled 
                        ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' 
                        : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90'
                    }`}
                  >
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Exit</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t transition-all duration-300 ${
            isToggled 
              ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
              : 'bg-[#EFECE3]/80 border-[#8FABD4]/20'
          }`}>
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => { navigate('/features'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left font-medium transition-colors ${
                  isToggled 
                    ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                    : 'text-[#4A70A9] hover:text-[#8FABD4]'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left font-medium transition-colors ${
                  isToggled 
                    ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                    : 'text-[#4A70A9] hover:text-[#8FABD4]'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left font-medium transition-colors ${
                  isToggled 
                    ? 'text-[#8FABD4] hover:text-[#4A70A9]' 
                    : 'text-[#4A70A9] hover:text-[#8FABD4]'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {user?.profilePhoto ? (
              <img 
                src={user.profilePhoto} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
              }`}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>
            {isNewUser ? 'Welcome' : 'Welcome back'}, {user?.name || 'Friend'}!
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 transition-all duration-500 ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>
            Ready to continue your wellness journey? Let's make today amazing!
          </p>
        </div>

        {/* Feature Cards */}
        <h3 className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center ${
          isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
        }`}>Your Wellness Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const featureImages = {
              'Mood Tracker': './photo3.png',
              'Mentorship': './photo4.png',
              'Fitness Tracker': './photo5.png',
              'Diet Planner': './photo11.png',
              'Scheduler': './photo12.png',
              'AI Chatbot': './photo6.png'
            };
            
            return (
              <div
                key={index}
                className={`group rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden ${
                  isToggled 
                    ? 'bg-[#000000]/60 border-[#8FABD4]/20' 
                    : 'bg-white/90 border-[#8FABD4]/30'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={featureImages[feature.title]} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 ${
                    isToggled 
                      ? 'bg-gradient-to-t from-[#000000]/60 to-transparent' 
                      : 'bg-gradient-to-t from-[#000000]/30 to-transparent'
                  }`}></div>
                  <div className={`absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${feature.color === '#687FE5' ? 'text-white' : 'text-gray-700'}`} style={{backgroundColor: feature.color}}>
                    {feature.icon}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2 sm:mb-3 ${
                    isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                  }`}>{feature.title}</h3>
                  <p className={`text-sm leading-relaxed mb-3 sm:mb-4 ${
                    isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
                  }`}>{feature.description}</p>
                  <button 
                    onClick={() => {
                      if (feature.title === 'AI Chatbot') { addActivity('ai', 'Used AI Chatbot'); navigate('/ai') }
                      else if (feature.title === 'Scheduler') { addActivity('scheduler', 'Opened Scheduler'); navigate('/scheduler') }
                      else if (feature.title === 'Diet Planner') { addActivity('diet', 'Checked Diet Planner'); navigate('/diet') }
                      else if (feature.title === 'Fitness Tracker') { addActivity('fitness', 'Opened Fitness Tracker'); navigate('/fitness') }
                      else if (feature.title === 'Mood Tracker') { addActivity('mood', 'Logged Mood'); navigate('/mood') }
                      else if (feature.title === 'Mentorship') { addActivity('mentorship', 'Visited Mentorship'); navigate('/mentorship') }
                    }}
                    className={`w-full text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                      isToggled 
                        ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white' 
                        : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9] text-white'
                    }`}>
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>



        {/* Days Active Tracker */}
        <div className="mt-8 sm:mt-12 rounded-3xl shadow-lg overflow-hidden" style={{ background: isToggled ? '#1a1a1a' : '#ffffff', border: isToggled ? '1px solid #333' : '1px solid #e5e7eb' }}>

          {/* Header */}
          <div className="p-6 sm:p-8" style={{ background: isToggled ? '#111' : '#f9fafb', borderBottom: isToggled ? '1px solid #333' : '1px solid #e5e7eb' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold" style={{ color: isToggled ? '#ffffff' : '#111827' }}>Days Active Tracker</h3>
                <p className="text-sm mt-1" style={{ color: isToggled ? '#9ca3af' : '#6b7280' }}>
                  {stats.daysActive >= 30 ? '🏆 Legendary!' : stats.daysActive >= 14 ? ' Amazing!' : stats.daysActive >= 7 ? ' On fire!' : stats.daysActive >= 3 ? '💪 Building momentum!' : '🌱 Start your journey!'}
                </p>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl" style={{ background: isToggled ? '#222' : '#ffffff', border: isToggled ? '1px solid #444' : '1px solid #e5e7eb' }}>
                <p className="text-5xl font-bold" style={{ color: isToggled ? '#ffffff' : '#111827' }}>{stats.daysActive}</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: isToggled ? '#9ca3af' : '#6b7280' }}>Days</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Calendar Grid */}
            <div className="mb-8">
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
                  <div key={i} className="text-center text-[10px] font-semibold uppercase" style={{ color: isToggled ? '#6b7280' : '#9ca3af' }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {[...Array(35)].map((_, i) => {
                  const dayNum = 35 - i
                  const isActive = dayNum <= stats.daysActive
                  const isToday = dayNum === stats.daysActive
                  return (
                    <div key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isToday ? 'scale-110 z-10 relative' : ''}`}
                      style={{
                        background: isToday
                          ? isToggled ? '#ffffff' : '#111827'
                          : isActive
                            ? isToggled ? '#333333' : '#e5e7eb'
                            : isToggled ? '#222222' : '#f9fafb',
                        border: isToday
                          ? isToggled ? '2px solid #ffffff' : '2px solid #111827'
                          : isActive
                            ? isToggled ? '1px solid #444' : '1px solid #d1d5db'
                            : isToggled ? '1px solid #2a2a2a' : '1px solid #f3f4f6'
                      }}>
                      <span style={{ color: isToday ? (isToggled ? '#111827' : '#ffffff') : isActive ? (isToggled ? '#ffffff' : '#374151') : isToggled ? '#444' : '#d1d5db' }}>
                        {isToday ? '●' : isActive ? '✓' : ''}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Milestones */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { days: 3, emoji: '', label: '3 Days' },
                { days: 7, emoji: '', label: '1 Week' },
                { days: 14, emoji: '', label: '2 Weeks' },
                { days: 30, emoji: '', label: '1 Month' }
              ].map(({ days, emoji, label }) => {
                const achieved = stats.daysActive >= days
                return (
                  <div key={days}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                    style={{
                      background: achieved ? (isToggled ? '#333' : '#111827') : isToggled ? '#222' : '#f3f4f6',
                      color: achieved ? (isToggled ? '#ffffff' : '#ffffff') : isToggled ? '#555' : '#9ca3af',
                      border: achieved ? 'none' : isToggled ? '1px solid #333' : '1px solid #e5e7eb'
                    }}>
                    <span>{achieved ? emoji : ''}</span>
                    <span>{label}</span>
                  </div>
                )
              })}
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span style={{ color: isToggled ? '#6b7280' : '#9ca3af' }}>Progress to 30 days</span>
                <span style={{ color: isToggled ? '#ffffff' : '#111827' }}>{Math.min(stats.daysActive, 30)}/30</span>
              </div>
              <div className="w-full h-4 rounded-full overflow-hidden" style={{ background: isToggled ? '#222' : '#f3f4f6', border: isToggled ? '1px solid #333' : '1px solid #e5e7eb' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((stats.daysActive / 30) * 100, 100)}%`, background: isToggled ? '#ffffff' : '#111827' }} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={() => updateStats('daysActive', true)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                style={{ background: isToggled ? '#ffffff' : '#111827', color: isToggled ? '#111827' : '#ffffff' }}>
                Mark Today Active
              </button>
              <button onClick={() => updateStats('daysActive', false)}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-80"
                style={{ background: 'transparent', color: isToggled ? '#9ca3af' : '#6b7280', border: isToggled ? '1px solid #444' : '1px solid #d1d5db' }}>
                Undo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
