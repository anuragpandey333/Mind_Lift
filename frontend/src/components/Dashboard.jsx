import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../useTheme'

const Icon = ({ d, className = 'w-5 h-5', color }) => (
  <svg className={className} fill="none" stroke={color || 'currentColor'} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)

const features = [
  { title: 'Mood Tracker', path: '/mood', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', desc: 'Track your daily emotions', iconColor: '#ec4899' },
  { title: 'Fitness', path: '/fitness', d: 'M13 10V3L4 14h7v7l9-11h-7z', desc: 'Monitor your workouts', iconColor: '#f97316' },
  { title: 'Diet', path: '/diet', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4', desc: 'Personalized meal plans', iconColor: '#22c55e' },
  { title: 'Scheduler', path: '/scheduler', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', desc: 'Organize your day', iconColor: '#3b82f6' },
  { title: 'Mentorship', path: '/mentorship', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197', desc: 'Connect with mentors', iconColor: '#a855f7' },
  { title: 'AI Chatbot', path: '/ai', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', desc: '24/7 wellness support', iconColor: '#6366f1' },
]

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const { isToggled } = useTheme()
  const [isNewUser, setIsNewUser] = useState(false)
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 })

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
          setStreak({ currentStreak: data.user.currentStreak ?? 0, longestStreak: data.user.longestStreak ?? 0 })
          localStorage.setItem('user', JSON.stringify(data.user))
        } else if (response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } catch {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const u = JSON.parse(storedUser)
          setUser(u)
          setStreak({ currentStreak: u.currentStreak ?? 0, longestStreak: u.longestStreak ?? 0 })
        }
      }
    }
    fetchUserData()
    setIsNewUser(localStorage.getItem('isNewUser') === 'true')
  }, [])

  useEffect(() => {
    if (isNewUser) {
      const t = setTimeout(() => localStorage.removeItem('isNewUser'), 100)
      return () => clearTimeout(t)
    }
  }, [isNewUser])

  const bg = isToggled ? '#0f1117' : '#F8FAFC'
  const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'
  const border = isToggled ? '#2a2d3a' : '#BCCCDC'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#9AA6B2'
  const hover = isToggled ? '#252836' : '#D9EAFD'
  const activeColor = isToggled ? '#3b82f6' : '#BCCCDC'

  return (
    <div className="flex flex-col min-h-full" style={{ background: bg, color: text }}>

      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: sidebar, borderBottom: `1px solid ${border}` }}>
        <div>
          <h1 className="text-lg font-bold" style={{ color: text }}>
            {isNewUser ? 'Welcome' : 'Welcome back'}, {user?.name?.split(' ')[0] || 'Friend'}!
          </h1>
          <p className="text-xs" style={{ color: subtext }}>Ready to continue your wellness journey?</p>
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
      <main className="flex-1 p-6">

        {/* Feature Cards */}
        <div className="mb-8">
          <h2 className="text-base font-semibold mb-4" style={{ color: subtext }}>Your Wellness Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.path}
                onClick={() => navigate(f.path)}
                className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                style={{ background: sidebar, borderColor: border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hover }}>
                  <Icon d={f.d} className="w-6 h-6" color={f.iconColor} />
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
                {streak.currentStreak >= 30 ? 'Legendary!' : streak.currentStreak >= 14 ? 'Amazing!' : streak.currentStreak >= 7 ? 'On fire!' : streak.currentStreak >= 3 ? 'Building momentum!' : 'Start your streak!'}
              </p>
            </div>
            <div className="text-center px-5 py-3 rounded-xl" style={{ background: hover }}>
              <p className="text-3xl font-bold" style={{ color: text }}>{streak.currentStreak}</p>
              <p className="text-xs" style={{ color: subtext }}>day streak</p>
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
                const isActive = dayNum <= streak.currentStreak
                const isToday = dayNum === streak.currentStreak
                return (
                  <div key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all ${isToday ? 'scale-110' : ''}`}
                    style={{
                      background: isToday ? activeColor : isActive ? `${activeColor}30` : '#F8FAFC',
                      color: isToday ? '#fff' : isActive ? activeColor : subtext,
                      border: isToday ? `2px solid ${activeColor}` : `1px solid ${border}`
                    }}>
                    {isToday ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg>
                    ) : isActive ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: subtext }}>
              <span>Progress to 30 days</span>
              <span style={{ color: text }}>{Math.min(streak.currentStreak, 30)}/30</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: hover }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((streak.currentStreak / 30) * 100, 100)}%`, background: activeColor }} />
            </div>
          </div>

          {/* Milestones */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[{ days: 3, label: '3 Days' }, { days: 7, label: '1 Week' }, { days: 14, label: '2 Weeks' }, { days: 30, label: '1 Month' }].map(({ days, label }) => {
              const achieved = streak.currentStreak >= days
              return (
                <span key={days} className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{ background: achieved ? `${activeColor}20` : hover, color: achieved ? activeColor : subtext, border: `1px solid ${achieved ? activeColor + '40' : border}` }}>
                  {achieved ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2} /></svg>
                  )}
                  {label}
                </span>
              )
            })}
          </div>

          {/* Longest Streak */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: hover }}>
            <span className="text-xs" style={{ color: subtext }}>Longest streak</span>
            <span className="text-sm font-bold" style={{ color: text }}>{streak.longestStreak} days</span>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Dashboard
