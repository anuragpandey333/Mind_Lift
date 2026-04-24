import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../useTheme'

const MoodTracker = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const { isToggled } = useTheme()

  const bg = isToggled ? '#0f1117' : '#F8FAFC'
  const sidebar = isToggled ? '#1a1d27' : '#F8FAFC'
  const border = isToggled ? '#2a2d3a' : '#BCCCDC'
  const text = isToggled ? '#e2e8f0' : '#1a202c'
  const subtext = isToggled ? '#94a3b8' : '#9AA6B2'
  const hover = isToggled ? '#252836' : '#D9EAFD'
  const activeColor = isToggled ? '#3b82f6' : '#BCCCDC'
  const [entries, setEntries] = useState([])
  const [stressLevel, setStressLevel] = useState(5)
  const [trigger, setTrigger] = useState('')
  const [note, setNote] = useState('')
  const [sleepQuality, setSleepQuality] = useState(5)
  const [energyLevel, setEnergyLevel] = useState(5)
  const [socialConnection, setSocialConnection] = useState(5)
  const [physicalActivity, setPhysicalActivity] = useState('')
  const [mealPattern, setMealPattern] = useState('')

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
        }
      } catch {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
      }
    }
    fetchUserData()
    fetchMoodEntries()
    
    const activity = {
      id: Date.now(),
      type: 'mood',
      action: 'Visited Mood Tracker',
      timestamp: new Date().toLocaleString()
    }
    const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]')
    const updatedActivities = [activity, ...existingActivities.slice(0, 4)]
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities))
  }, [])

  const fetchMoodEntries = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/mood`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEntries(response.data)
    } catch (error) {
      console.error('Error fetching mood entries:', error)
    }
  }

  const saveMoodEntry = async () => {
    try {
      const moodLabel = stressLevel <= 3 ? 'Great' : stressLevel <= 5 ? 'Okay' : stressLevel <= 7 ? 'Stressed' : 'Overwhelmed'
      const moodEmoji = stressLevel <= 3 ? 'happy' : stressLevel <= 5 ? 'neutral' : stressLevel <= 7 ? 'worried' : 'sad'
      
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/api/mood`, {
        mood: moodLabel.toLowerCase(),
        moodLabel,
        moodEmoji,
        stressLevel,
        trigger,
        note,
        sleepQuality,
        energyLevel,
        socialConnection,
        physicalActivity,
        mealPattern
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const activity = {
        id: Date.now(),
        type: 'mood',
        action: `Logged mood: ${moodLabel}`,
        timestamp: new Date().toLocaleString()
      }
      const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]')
      const updatedActivities = [activity, ...existingActivities.slice(0, 4)]
      localStorage.setItem('recentActivities', JSON.stringify(updatedActivities))
      
      setStressLevel(5)
      setTrigger('')
      setNote('')
      setSleepQuality(5)
      setEnergyLevel(5)
      setSocialConnection(5)
      setPhysicalActivity('')
      setMealPattern('')
      
      fetchMoodEntries()
    } catch (error) {
      console.error('Error saving mood entry:', error)
    }
  }

  const getAverageStress = () => {
    if (entries.length === 0) return 0
    const sum = entries.reduce((acc, entry) => acc + entry.stressLevel, 0)
    return (sum / entries.length).toFixed(1)
  }

  const deleteEntry = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/mood/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMoodEntries()
    } catch (error) {
      console.error('Error deleting mood entry:', error)
    }
  }

  const getRecentTrend = () => {
    if (entries.length < 2) return 'neutral'
    const recent = entries.slice(0, 3)
    const avgRecent = recent.reduce((acc, e) => acc + e.stressLevel, 0) / recent.length
    const older = entries.slice(3, 6)
    if (older.length === 0) return 'neutral'
    const avgOlder = older.reduce((acc, e) => acc + e.stressLevel, 0) / older.length
    
    if (avgRecent < avgOlder - 1) return 'improving'
    if (avgRecent > avgOlder + 1) return 'declining'
    return 'stable'
  }

  const getMoodEmoji = (level) => {
    if (level <= 3) return (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
    if (level <= 5) return (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
    )
    if (level <= 7) return (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
    return (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  const getMoodColor = (level) => {
    if (level <= 3) return isToggled ? '#4ade80' : '#22c55e'
    if (level <= 5) return isToggled ? '#fbbf24' : '#f59e0b'
    if (level <= 7) return isToggled ? '#fb923c' : '#f97316'
    return isToggled ? '#f87171' : '#ef4444'
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: bg, color: text }}>
      {/* Top Bar - Same as Dashboard */}
      <header className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ background: sidebar, borderBottom: `1px solid ${border}` }}>
        <div>
          <h1 className="text-lg font-bold" style={{ color: text }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Friend'}!
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


      
      <main className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 " style={{ color: text }}>Mood Tracker</h1>
          <p className="text-sm " style={{ color: subtext }}>Track your emotional wellness journey</p>
        </div>

        {/* Quick Stats */}
        {entries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
              <div className="flex items-center justify-center mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 " style={{ color: text }}>{entries.length}</div>
              <div className="text-sm font-medium " style={{ color: subtext }}>Total Check-ins</div>
            </div>
            <div className="rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
              <div className="flex items-center justify-center mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 " style={{ color: text }}>{getAverageStress()}</div>
              <div className="text-sm font-medium " style={{ color: subtext }}>Average Stress</div>
            </div>
            <div className="rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
              <div className="flex items-center justify-center mb-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 capitalize " style={{ color: text }}>{getRecentTrend()}</div>
              <div className="text-sm font-medium " style={{ color: subtext }}>Recent Trend</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Mood Entry */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Stress Level Card */}
            <div className="rounded-2xl shadow-lg p-6 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold " style={{ color: text }}>How stressed are you?</h3>
                <div className="text-5xl">{getMoodEmoji(stressLevel)}</div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(parseInt(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${getMoodColor(stressLevel)} ${stressLevel * 10}%, ${isToggled ? '#2a2d3a' : '#BCCCDC'} ${stressLevel * 10}%)`
                  }}
                />
                <div className="flex justify-between mt-3">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <button
                      key={num}
                      onClick={() => setStressLevel(num)}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                        stressLevel === num 
                          ? 'scale-125 text-white' 
                          : isToggled ? 'text-[#8FABD4]/50' : 'text-gray-400'
                      }`}
                      style={{
                        backgroundColor: stressLevel === num ? getMoodColor(num) : 'transparent'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Wellness Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Sleep Quality */}
              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>Sleep Quality</h4>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9AA6B2 ${sleepQuality * 10}%, ${isToggled ? '#2a2d3a' : '#BCCCDC'} ${sleepQuality * 10}%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-2">
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>Poor</span>
                  <span className="font-bold " style={{ color: text }}>{sleepQuality}/10</span>
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>Great</span>
                </div>
              </div>

              {/* Energy Level */}
              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>Energy Level</h4>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9AA6B2 ${energyLevel * 10}%, ${isToggled ? '#2a2d3a' : '#BCCCDC'} ${energyLevel * 10}%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-2">
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>Low</span>
                  <span className="font-bold " style={{ color: text }}>{energyLevel}/10</span>
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>High</span>
                </div>
              </div>

              {/* Social Connection */}
              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>Social Connection</h4>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={socialConnection}
                  onChange={(e) => setSocialConnection(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9AA6B2 ${socialConnection * 10}%, ${isToggled ? '#2a2d3a' : '#BCCCDC'} ${socialConnection * 10}%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-2">
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>Isolated</span>
                  <span className="font-bold " style={{ color: text }}>{socialConnection}/10</span>
                  <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'}>Connected</span>
                </div>
              </div>

              {/* Trigger */}
              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>What's on your mind?</h4>
                </div>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border-2 focus:outline-none text-sm ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                      : 'bg-white border-[#BCCCDC] text-gray-800 focus:border-[#9AA6B2]'
                  }`}
                >
                  <option value="">Select trigger</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Projects">Projects</option>
                  <option value="Placements">Placements</option>
                  <option value="Sleep">Sleep Issues</option>
                  <option value="Social">Social Pressure</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Activity & Meal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>Physical Activity</h4>
                </div>
                <select
                  value={physicalActivity}
                  onChange={(e) => setPhysicalActivity(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border-2 focus:outline-none text-sm ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                      : 'bg-white border-[#BCCCDC] text-gray-800 focus:border-[#9AA6B2]'
                  }`}
                >
                  <option value="">Select activity</option>
                  <option value="none">No exercise</option>
                  <option value="light">Light activity</option>
                  <option value="moderate">Moderate workout</option>
                  <option value="intense">Intense training</option>
                </select>
              </div>

              <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h4 className="font-semibold " style={{ color: text }}>Eating Pattern</h4>
                </div>
                <select
                  value={mealPattern}
                  onChange={(e) => setMealPattern(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border-2 focus:outline-none text-sm ${
                    isToggled 
                      ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                      : 'bg-white border-[#BCCCDC] text-gray-800 focus:border-[#9AA6B2]'
                  }`}
                >
                  <option value="">Select pattern</option>
                  <option value="regular">Regular meals</option>
                  <option value="skipped">Skipped meals</option>
                  <option value="overate">Overate</option>
                  <option value="stress-eating">Stress eating</option>
                  <option value="healthy">Healthy choices</option>
                </select>
              </div>
            </div>

            {/* Note */}
            <div className="rounded-2xl shadow-lg p-5 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h4 className="font-semibold " style={{ color: text }}>Add a note (optional)</h4>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="How are you feeling today? What's on your mind?"
                className={`w-full p-3 rounded-lg border-2 focus:outline-none resize-none ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9] placeholder-[#8FABD4]/50'
                    : 'bg-white border-[#BCCCDC] text-gray-800 focus:border-[#9AA6B2] placeholder-gray-500'
                }`}
                rows="3"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveMoodEntry}
              className={`w-full font-bold py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] text-white' 
                  : 'bg-gradient-to-r from-[#9AA6B2] to-[#BCCCDC] text-white'
              }`}
            >
              Save Check-in
            </button>
          </div>

          {/* Right Column - Recent Entries */}
          <div className="lg:col-span-1">
            {entries.length > 0 ? (
              <div className="rounded-2xl shadow-lg p-5 sticky top-6 " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <h3 className="text-lg font-bold mb-4 " style={{ color: text }}>Recent Check-ins</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {entries.slice(0, 10).map((entry) => (
                    <div key={entry.id} className={`rounded-xl p-3 border-2 transition-all hover:scale-105 ${
                      isToggled ? 'border-[#8FABD4]/20 bg-[#000000]/40' : 'border-[#BCCCDC] bg-white'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.moodLabel === 'Great' ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : entry.moodLabel === 'Okay' ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}</span>
                          <div>
                            <div className="font-semibold text-sm " style={{ color: text }}>{entry.moodLabel}</div>
                            <div className={`text-xs ${
                              isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'
                            }`}>{new Date(entry.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-xs " style={{ color: subtext }}>
                        Stress: {entry.stressLevel}/10
                        {entry.trigger && ` • ${entry.trigger}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl shadow-lg p-8 text-center " style={{ background: sidebar, borderColor: border, border: `1px solid ${border}` }}>
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 " style={{ color: text }}>Start Your Journey</h3>
                <p className="text-sm " style={{ color: subtext }}>Begin tracking your mood to see patterns and insights</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}

export default MoodTracker