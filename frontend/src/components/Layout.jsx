import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useTheme } from '../useTheme'

const Icon = ({ d, className = 'w-5 h-5', color }) => (
  <svg className={className} fill="none" stroke={color || 'currentColor'} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)

const navItems = [
  { label: 'Dashboard', path: '/dashboard', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Mood Tracker', path: '/mood', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { label: 'Fitness', path: '/fitness', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Diet', path: '/diet', d: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4' },
  { label: 'Scheduler', path: '/scheduler', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Mentorship', path: '/mentorship', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197' },
  { label: 'AI Chatbot', path: '/ai', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
]

const Layout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const { isToggled, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  const bg = isToggled ? '#0f1117' : '#F8FAFC'
  const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'
  const border = isToggled ? '#2a2d3a' : '#BCCCDC'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#9AA6B2'
  const hover = isToggled ? '#252836' : '#D9EAFD'
  const activeColor = isToggled ? '#3b82f6' : '#1a202c'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg, color: text }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 h-full flex flex-col flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 260, background: sidebar, borderRight: `1px solid ${border}` }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: `1px solid ${border}` }}>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-9 h-9 bg-gradient-to-br from-[#4A70A9] to-[#5A6F8C] rounded-xl shadow-lg transition-all duration-500 transform hover:scale-110 flex-shrink-0 ${
              isToggled ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <svg className={`w-5 h-5 text-white transition-all duration-500 ${
              isToggled ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9]">MindLift</span>
        </div>

        {/* Profile */}
        <div className="px-4 py-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer" style={{ background: hover }} onClick={() => { navigate('/profile'); setSidebarOpen(false) }}>
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: activeColor }}>
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
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                  background: isActive ? `${activeColor}18` : 'transparent',
                  color: isActive ? activeColor : subtext,
                  borderLeft: isActive ? `3px solid ${activeColor}` : '3px solid transparent'
                }}
              >
                <Icon d={item.d} className="w-5 h-5" />
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

      {/* Page Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center px-4 py-3 flex-shrink-0" style={{ background: sidebar, borderBottom: `1px solid ${border}` }}>
          <button className="p-2 rounded-lg" style={{ background: hover }} onClick={() => setSidebarOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: text }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="ml-3 font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9]">MindLift</span>
        </div>

        <div className="flex-1 overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
