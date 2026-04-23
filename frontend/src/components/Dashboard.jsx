import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const navItems = [
  {
    label: 'Mood Tracker', path: '/mood', emoji: '😊',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  },
  {
    label: 'Fitness', path: '/fitness', emoji: '💪',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  },
  {
    label: 'Diet', path: '/diet', emoji: '🥗',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4" />
  },
  {
    label: 'Scheduler', path: '/scheduler', emoji: '📅',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    label: 'Mentorship', path: '/mentorship', emoji: '🎓',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
  },
  {
    label: 'AI Chatbot', path: '/ai', emoji: '🤖',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  },
]

const features = [
  { title: 'Mood Tracker', path: '/mood', emoji: '😊', desc: 'Track your daily emotions', color: 'bg-pink-50 border-pink-200', iconColor: 'text-pink-500' },
  { title: 'Fitness', path: '/fitness', emoji: '💪', desc: 'Monitor your workouts', color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-500' },
  { title: 'Diet', path: '/diet', emoji: '🥗', desc: 'Personalized meal plans', color: 'bg-green-50 border-green-200', iconColor: 'text-green-500' },
  { title: 'Scheduler', path: '/scheduler', emoji: '📅', desc: 'Organize your day', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-500' },
  { title: 'Mentorship', path: '/mentorship', emoji: '🎓', desc: 'Connect with mentors', color: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-500' },
  { title: 'AI Chatbot', path: '/ai', emoji: '🤖', desc: '24/7 wellness support', color: 'bg-indigo-50 border-indigo-200', iconColor: 'text-indigo-500' },
]

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isToggled, setIsToggled] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [stats, setStats] = useState({ daysActive: 0 })
  const [activeNav, setActiveNav] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const updateStats = (type, increment = true) => {
    const newStats = { ...stats }
    newStats[type] = increment ? newStats[type] + 1 : Math.max(0, newStats[type] - 1)
    setStats(newStats)
    localStorage.setItem('userStats', JSON.stringify(newStats))
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token')
      if (!token) { navigate('/login'); return }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          localStorage.setItem('user', JSON.stringify(data.user))
        } else if (response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } catch {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
      }
    }
    fetchUserData()
    setIsToggled(localStorage.getItem('theme') === 'dark')
    setIsNewUser(localStorage.getItem('isNewUser') === 'true')
    const userStats = localStorage.getItem('userStats')
    setStats(userStats ? JSON.parse(userStats) : { daysActive: 0 })
  }, [])

  useEffect(() => {
    if (isNewUser) {
      const t = setTimeout(() => localStorage.removeItem('isNewUser'), 100)
      return () => clearTimeout(t)
    }
  }, [isNewUser])

  const toggleTheme = () => {
    const next = !isToggled
    setIsToggled(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  const handleNav = (path) => {
    setActiveNav(path)
    setSidebarOpen(false)
    navigate(path)
  }

  const bg = isToggled ? '#0f1117' : '#f5f6fa'
  const sidebar = isToggled ? '#1a1d27' : '#ffffff'
  const border = isToggled ? '#2a2d3a' : '#e8eaf0'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#64748b'
  const hover = isToggled ? '#252836' : '#f1f5f9'
  const activeColor = isToggled ? '#3b82f6' : '#4A70A9'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg, color: text }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 h-full flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 260, background: sidebar, borderRight: `1px solid ${border}` }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: activeColor }}>M</div>
          <span className="text-lg font-bold" style={{ color: text }}>MindLift</span>
          <button onClick={toggleTheme} className="ml-auto p-1.5 rounded-lg transition-colors" style={{ background: hover }}>
            <span className="text-sm">{isToggled ? '☀️' : '🌙'}</span>
          </button>
        </div>

        {/* Profile */}
        <div className="px-4 py-5" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors" style={{ background: hover }} onClick={() => navigate('/profile')}>
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-11 h-11 rounded-full object-cover" />
            ) : (
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: activeColor }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate" style={{ color: text }}>{user?.name || 'User'}</p>
              <p className="text-xs truncate" style={{ color: subtext }}>{user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-3" style={{ color: subtext }}>Menu</p>
          {navItems.map((item) => {
            const isActive = activeNav === item.path
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background: isActive ? `${activeColor}18` : 'transparent',
                  color: isActive ? activeColor : subtext,
                  borderLeft: isActive ? `3px solid ${activeColor}` : '3px solid transparent'
                }}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: activeColor }} />}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${border}` }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: '#ef4444', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: sidebar, borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-lg" style={{ background: hover }} onClick={() => setSidebarOpen(true)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: text }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold" style={{ color: text }}>
                {isNewUser ? 'Welcome' : 'Welcome back'}, {user?.name?.split(' ')[0] || 'Friend'}! 👋
              </h1>
              <p className="text-xs" style={{ color: subtext }}>Ready to continue your wellness journey?</p>
            </div>
          </div>
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors" style={{ background: hover }}>
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: activeColor }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <span className="text-sm font-medium hidden sm:block" style={{ color: text }}>{user?.name || 'Profile'}</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* Feature Cards */}
          <div className="mb-8">
            <h2 className="text-base font-semibold mb-4" style={{ color: subtext }}>Your Wellness Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div
                  key={f.path}
                  onClick={() => handleNav(f.path)}
                  className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: sidebar, borderColor: border }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: hover }}>
                    {f.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: text }}>{f.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: subtext }}>{f.desc}</p>
                  </div>
                  <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: subtext }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Days Active Tracker */}
          <div className="rounded-2xl border p-6" style={{ background: sidebar, borderColor: border }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold" style={{ color: text }}>Days Active</h2>
                <p className="text-xs mt-0.5" style={{ color: subtext }}>
                  {stats.daysActive >= 30 ? '🏆 Legendary!' : stats.daysActive >= 14 ? '🌟 Amazing!' : stats.daysActive >= 7 ? '🔥 On fire!' : stats.daysActive >= 3 ? '💪 Building momentum!' : '🌱 Start your streak!'}
                </p>
              </div>
              <div className="text-center px-5 py-3 rounded-xl" style={{ background: hover }}>
                <p className="text-3xl font-bold" style={{ color: text }}>{stats.daysActive}</p>
                <p className="text-xs" style={{ color: subtext }}>days</p>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="text-center text-[10px] font-semibold" style={{ color: subtext }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[...Array(35)].map((_, i) => {
                  const dayNum = 35 - i
                  const isActive = dayNum <= stats.daysActive
                  const isToday = dayNum === stats.daysActive
                  return (
                    <div key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${isToday ? 'scale-110' : ''}`}
                      style={{
                        background: isToday ? activeColor : isActive ? `${activeColor}30` : hover,
                        color: isToday ? '#fff' : isActive ? activeColor : subtext,
                        border: isToday ? `2px solid ${activeColor}` : `1px solid ${border}`
                      }}>
                      {isToday ? '●' : isActive ? '✓' : ''}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: subtext }}>
                <span>Progress to 30 days</span>
                <span style={{ color: text }}>{Math.min(stats.daysActive, 30)}/30</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: hover }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((stats.daysActive / 30) * 100, 100)}%`, background: activeColor }} />
              </div>
            </div>

            {/* Milestones */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[{ days: 3, label: '3 Days' }, { days: 7, label: '1 Week' }, { days: 14, label: '2 Weeks' }, { days: 30, label: '1 Month' }].map(({ days, label }) => {
                const achieved = stats.daysActive >= days
                return (
                  <span key={days} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: achieved ? `${activeColor}20` : hover, color: achieved ? activeColor : subtext, border: `1px solid ${achieved ? activeColor + '40' : border}` }}>
                    {achieved ? '✓' : '○'} {label}
                  </span>
                )
              })}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button onClick={() => updateStats('daysActive', true)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: activeColor }}>
                ✅ Mark Today Active
              </button>
              <button onClick={() => updateStats('daysActive', false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: hover, color: subtext, border: `1px solid ${border}` }}>
                Undo
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard
