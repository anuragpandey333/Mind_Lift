import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../useTheme'

const Profile = () => {
  const navigate = useNavigate()
  const { isToggled } = useTheme()
  const [user, setUser] = useState({})
  const [formData, setFormData] = useState({ name: '', email: '', bio: '', phone: '', location: '', profilePhoto: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({ workouts: 0, completedWorkouts: 0, calories: 0, tasks: 0, completedTasks: 0, moodLogs: 0, avgStress: 0 })
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 })

  const API = import.meta.env.VITE_API_URL
  const token = () => localStorage.getItem('token')

  useEffect(() => {
    const fetchAll = async () => {
      const t = token()
      if (!t) { navigate('/login'); return }
      const headers = { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' }

      // User
      try {
        const r = await fetch(`${API}/api/auth/me`, { headers })
        if (r.ok) {
          const { user: u } = await r.json()
          setUser(u)
          setFormData({ name: u.name || '', email: u.email || '', bio: u.bio || '', phone: u.phone || '', location: u.location || '', profilePhoto: u.profilePhoto || '' })
          setPhotoPreview(u.profilePhoto || '')
          setStreak({ currentStreak: u.currentStreak ?? 0, longestStreak: u.longestStreak ?? 0 })
          localStorage.setItem('user', JSON.stringify(u))
        } else if (r.status === 401) { localStorage.removeItem('token'); navigate('/login') }
      } catch {
        const s = localStorage.getItem('user')
        if (s) { const u = JSON.parse(s); setUser(u); setFormData({ name: u.name || '', email: u.email || '', bio: u.bio || '', phone: u.phone || '', location: u.location || '', profilePhoto: u.profilePhoto || '' }); setPhotoPreview(u.profilePhoto || ''); setStreak({ currentStreak: u.currentStreak ?? 0, longestStreak: u.longestStreak ?? 0 }) }
      }

      // Stats in parallel
      try {
        const [workoutsRes, tasksRes, moodRes] = await Promise.all([
          fetch(`${API}/api/fitness/workouts`, { headers }),
          fetch(`${API}/api/tasks`, { headers }),
          fetch(`${API}/api/mood`, { headers }),
        ])
        const workouts = workoutsRes.ok ? await workoutsRes.json() : []
        const tasks = tasksRes.ok ? await tasksRes.json() : []
        const moods = moodRes.ok ? await moodRes.json() : []

        const completedWorkouts = workouts.filter(w => w.completed)
        const calories = completedWorkouts.reduce((s, w) => s + (w.calories || 0), 0)
        const avgStress = moods.length ? (moods.reduce((s, m) => s + (m.stressLevel || 0), 0) / moods.length).toFixed(1) : 0

        setStats({
          workouts: workouts.length,
          completedWorkouts: completedWorkouts.length,
          calories,
          tasks: tasks.length,
          completedTasks: tasks.filter(t => t.completed).length,
          moodLogs: moods.length,
          avgStress,
        })
      } catch { }
    }
    fetchAll()
  }, [])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => { setPhotoPreview(ev.target.result); setFormData(f => ({ ...f, profilePhoto: ev.target.result })) }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token()}` },
        body: JSON.stringify(formData)
      })
      const data = await r.json()
      if (r.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setFormData({ name: data.user.name || '', email: data.user.email || '', bio: data.user.bio || '', phone: data.user.phone || '', location: data.user.location || '', profilePhoto: data.user.profilePhoto || '' })
        setPhotoPreview(data.user.profilePhoto || '')
        setIsEditing(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch { }
    setLoading(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({ name: user.name || '', email: user.email || '', bio: user.bio || '', phone: user.phone || '', location: user.location || '', profilePhoto: user.profilePhoto || '' })
    setPhotoPreview(user.profilePhoto || '')
  }

  const dark = isToggled
  const initials = formData.name ? formData.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U'

  const inputCls = `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 ${
    dark
      ? 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:ring-[#4A70A9]/60 focus:border-[#4A70A9]/60'
      : 'bg-white border-[#BCCCDC]/40 text-[#1a202c] placeholder-gray-400 focus:ring-[#4A70A9]/40 focus:border-[#4A70A9]/60'
  }`
  const labelCls = `block text-xs font-bold uppercase tracking-widest mb-2 ${dark ? 'text-[#9AA6B2]' : 'text-[#4A70A9]'}`
  const cardCls = `rounded-3xl border transition-all duration-500 ${dark ? 'bg-[#13161f] border-white/10' : 'bg-white border-[#BCCCDC]/30 shadow-sm'}`

  const statItems = [
    {
      label: 'Workouts Done',
      value: stats.completedWorkouts,
      sub: `of ${stats.workouts} total`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Calories Burned',
      value: stats.calories,
      sub: 'kcal total',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
    },
    {
      label: 'Tasks Completed',
      value: stats.completedTasks,
      sub: `of ${stats.tasks} total`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: 'Mood Check-ins',
      value: stats.moodLogs,
      sub: `avg stress ${stats.avgStress}/10`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${dark ? 'bg-[#0a0c12]' : 'bg-[#f0f4f8]'}`}>

      {/* Hero Banner */}
      <div className="relative h-32 bg-gradient-to-r from-[#4A70A9] via-[#5A6F8C] to-[#4A70A9] overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -top-8 right-20 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/5" />

        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-5 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Dashboard
        </button>

        {saved && (
          <div className="absolute top-5 right-6 flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved!
          </div>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-white text-xl font-bold tracking-wide">My Profile</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16">

        {/* Avatar Card */}
        <div className={`relative -mt-14 mb-5 ${cardCls} shadow-2xl`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl ring-4 ring-[#4A70A9]/40 shadow-xl overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#4A70A9] to-[#5A6F8C] flex items-center justify-center text-white text-2xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4A70A9] hover:bg-[#5A6F8C] rounded-xl flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              )}
            </div>

            {/* Name & chips */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className={`text-xl font-bold mb-1 ${dark ? 'text-white' : 'text-[#1a202c]'}`}>
                {formData.name || 'Your Name'}
              </h2>
              <p className={`text-sm mb-3 ${dark ? 'text-[#9AA6B2]' : 'text-[#4A70A9]'}`}>{formData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {formData.location && (
                  <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${dark ? 'bg-white/10 text-white/70' : 'bg-[#D9EAFD] text-[#4A70A9]'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {formData.location}
                  </span>
                )}
                {formData.phone && (
                  <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${dark ? 'bg-white/10 text-white/70' : 'bg-[#D9EAFD] text-[#4A70A9]'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {formData.phone}
                  </span>
                )}
                <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${dark ? 'bg-[#4A70A9]/30 text-[#9AA6B2]' : 'bg-[#4A70A9]/10 text-[#4A70A9]'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Student
                </span>
              </div>
            </div>

            {/* Edit Profile button */}
            <button
              onClick={() => setIsEditing(e => !e)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${
                isEditing
                  ? dark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-500'
                  : 'bg-gradient-to-r from-[#4A70A9] to-[#5A6F8C] text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Close
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Bio strip */}
          {formData.bio && !isEditing && (
            <div className={`mx-6 mb-6 px-4 py-3 rounded-xl text-sm italic border-l-4 border-[#4A70A9] ${dark ? 'bg-white/5 text-white/60' : 'bg-[#f0f4f8] text-[#4A70A9]/80'}`}>
              "{formData.bio}"
            </div>
          )}
        </div>

        {/* Edit Information — only when editing */}
        {isEditing && (
          <div className={`mb-5 ${cardCls} p-6 shadow-xl`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-[#4A70A9] to-[#5A6F8C] rounded-full" />
              <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-[#1a202c]'}`}>Edit Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Full Name</label>
                <input type="text" className={inputCls} value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" className={inputCls} value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="tel" className={inputCls} value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" className={inputCls} value={formData.location} onChange={e => setFormData(f => ({ ...f, location: e.target.value }))} placeholder="City, Country" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Bio</label>
                <textarea rows={3} className={`${inputCls} resize-none`} value={formData.bio} onChange={e => setFormData(f => ({ ...f, bio: e.target.value }))} placeholder="Tell us a little about yourself..." />
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={handleCancel}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:scale-105 ${dark ? 'border-white/20 text-white/60 hover:bg-white/5' : 'border-[#BCCCDC] text-[#9AA6B2] hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#4A70A9] to-[#5A6F8C] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {/* Streak Card */}
        <div className={`mb-5 ${cardCls} p-6`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-gradient-to-b from-[#4A70A9] to-[#5A6F8C] rounded-full" />
            <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-[#1a202c]'}`}>Streak</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl p-4 border flex flex-col items-center gap-1 ${dark ? 'bg-white/5 border-white/10' : 'bg-[#D9EAFD]/30 border-[#BCCCDC]/40'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${dark ? 'bg-[#4A70A9]/30 text-orange-400' : 'bg-[#4A70A9]/10 text-orange-500'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
              </div>
              <span className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a202c]'}`}>{streak.currentStreak}</span>
              <span className={`text-xs font-semibold ${dark ? 'text-[#D9EAFD]' : 'text-[#4A70A9]'}`}>Current Streak</span>
              <span className={`text-xs ${dark ? 'text-[#9AA6B2]' : 'text-[#9AA6B2]'}`}>
                {streak.currentStreak >= 30 ? 'Legendary!' : streak.currentStreak >= 14 ? 'Amazing!' : streak.currentStreak >= 7 ? 'On fire!' : streak.currentStreak >= 3 ? 'Building momentum!' : 'Keep going!'}
              </span>
            </div>
            <div className={`rounded-2xl p-4 border flex flex-col items-center gap-1 ${dark ? 'bg-white/5 border-white/10' : 'bg-[#D9EAFD]/30 border-[#BCCCDC]/40'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${dark ? 'bg-[#4A70A9]/30 text-yellow-400' : 'bg-[#4A70A9]/10 text-yellow-500'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <span className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a202c]'}`}>{streak.longestStreak}</span>
              <span className={`text-xs font-semibold ${dark ? 'text-[#D9EAFD]' : 'text-[#4A70A9]'}`}>Longest Streak</span>
              <span className={`text-xs ${dark ? 'text-[#9AA6B2]' : 'text-[#9AA6B2]'}`}>days</span>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className={`${cardCls} p-6`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-gradient-to-b from-[#4A70A9] to-[#5A6F8C] rounded-full" />
            <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-[#1a202c]'}`}>Activity Summary</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statItems.map((s) => (
              <div key={s.label} className={`rounded-2xl p-4 border transition-all duration-300 hover:scale-105 ${
                dark ? 'bg-white/5 border-white/10' : 'bg-[#D9EAFD]/30 border-[#BCCCDC]/40'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  dark ? 'bg-[#4A70A9]/30 text-[#BCCCDC]' : 'bg-[#4A70A9]/10 text-[#4A70A9]'
                }`}>
                  {s.icon}
                </div>
                <div className={`text-2xl font-bold mb-0.5 ${dark ? 'text-white' : 'text-[#1a202c]'}`}>{s.value}</div>
                <div className={`text-xs font-semibold mb-0.5 ${dark ? 'text-[#D9EAFD]' : 'text-[#4A70A9]'}`}>{s.label}</div>
                <div className={`text-xs ${dark ? 'text-[#9AA6B2]' : 'text-[#9AA6B2]'}`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
