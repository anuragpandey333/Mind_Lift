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
    const userData = localStorage.getItem('user')
    const theme = localStorage.getItem('theme')
    const newUserFlag = localStorage.getItem('isNewUser')
    const activities = localStorage.getItem('recentActivities')
    const userStats = localStorage.getItem('userStats')
    
    if (userData) {
      setUser(JSON.parse(userData))
    }
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
              'Diet Planner': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
              'Scheduler': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
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
                      if (feature.title === 'AI Chatbot') navigate('/ai')
                      else if (feature.title === 'Scheduler') navigate('/scheduler')
                      else if (feature.title === 'Diet Planner') navigate('/diet')
                      else if (feature.title === 'Fitness Tracker') navigate('/fitness')
                      else if (feature.title === 'Mood Tracker') navigate('/mood')
                      else if (feature.title === 'Mentorship') navigate('/mentorship')
                    }}
                    className={`w-full text-sm font-semibold px-4 py-3 rounded-lg transition-all duration-200 ${
                      isToggled 
                        ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white hover:shadow-lg' 
                        : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9] text-white hover:shadow-lg'
                    }`}>
                    Open Tool
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className={`mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl shadow-lg ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => {
                const getIcon = (type) => {
                  switch(type) {
                    case 'mentorship':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    case 'mood':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    case 'fitness':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    case 'diet':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    default:
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  }
                }
                
                return (
                  <div key={activity.id} className={`flex items-center justify-between p-4 rounded-lg ${
                    isToggled ? 'bg-[#4A70A9]/10' : 'bg-[#8FABD4]/10'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        isToggled ? 'bg-[#4A70A9]' : 'bg-[#8FABD4]'
                      }`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getIcon(activity.type)}
                        </svg>
                      </div>
                      <div>
                        <p className={`font-semibold ${
                          isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                        }`}>{activity.action}</p>
                        <p className={`text-sm ${
                          isToggled ? 'text-[#8FABD4]/70' : 'text-[#000000]/60'
                        }`}>{activity.timestamp}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteActivity(activity.id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )
              })
            ) : (
              <div className={`text-center py-8 ${
                isToggled ? 'text-[#8FABD4]/70' : 'text-[#000000]/60'
              }`}>
                <p>No recent activity yet. Start exploring your wellness tools!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-3xl font-bold ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>{stats.daysActive}</div>
              <div className="flex gap-1">
                <button onClick={() => updateStats('daysActive', true)} className="text-green-500 hover:text-green-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button onClick={() => updateStats('daysActive', false)} className="text-red-500 hover:text-red-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Days Active</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-3xl font-bold ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>{stats.moodEntries}</div>
              <div className="flex gap-1">
                <button onClick={() => updateStats('moodEntries', true)} className="text-green-500 hover:text-green-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button onClick={() => updateStats('moodEntries', false)} className="text-red-500 hover:text-red-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Mood Entries</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-3xl font-bold ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>{stats.goalsAchieved}</div>
              <div className="flex gap-1">
                <button onClick={() => updateStats('goalsAchieved', true)} className="text-green-500 hover:text-green-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button onClick={() => updateStats('goalsAchieved', false)} className="text-red-500 hover:text-red-700 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Goals Achieved</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard