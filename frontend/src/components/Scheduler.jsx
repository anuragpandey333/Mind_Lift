import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from '../useTheme'

const Scheduler = () => {
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
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [taskPriority, setTaskPriority] = useState('medium')

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
    fetchTasks()
    
    const activity = {
      id: Date.now(),
      type: 'scheduler',
      action: 'Visited Task Scheduler',
      timestamp: new Date().toLocaleString()
    }
    const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]')
    const updatedActivities = [activity, ...existingActivities.slice(0, 4)]
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities))
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    }
  }

  const addTask = async () => {
    if (!newTask.trim()) return
    
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        title: newTask,
        priority: taskPriority,
        dueDate: selectedDate,
        category: 'personal'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewTask('')
      fetchTasks()
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id)
      const token = localStorage.getItem('token')
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        completed: !task.completed
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const clearAllTasks = async () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token')
        await Promise.all(
          tasks.map(task => 
            axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${task.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          )
        )
        setTasks([])
        localStorage.removeItem('tasks')
      } catch (error) {
        console.error('Error clearing tasks:', error)
        alert('Failed to clear all tasks. Please try again.')
      }
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0]
    return taskDate === today
  })
  
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate) return false
    const taskDate = new Date(task.dueDate).toISOString().split('T')[0]
    return taskDate > today
  })
  const completedTasks = tasks.filter(task => task.completed)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return isToggled ? 'text-red-400' : 'text-red-600'
      case 'medium': return isToggled ? 'text-yellow-400' : 'text-yellow-600'
      case 'low': return isToggled ? 'text-green-400' : 'text-green-600'
      default: return isToggled ? 'text-[#8FABD4]' : 'text-[#9AA6B2]'
    }
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
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 " style={{ color: text }}>Calendar Task Scheduler</h1>
          <p className={`text-lg ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#9AA6B2]/90'
          }`}>Organize your tasks and manage your daily routine</p>
        </div>

        {/* Add Task Section */}
        <div className="p-6 rounded-2xl shadow-lg mb-8 " style={{ background: sidebar, borderColor: border }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold " style={{ color: text }}>Add New Task</h2>
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white"
              >
                Trash Clear All
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description..."
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4] placeholder-[#8FABD4]/60' 
                  : 'border-[#BCCCDC]/30 focus:ring-[#9AA6B2] bg-[#D9EAFD]/80 text-[#9AA6B2] placeholder-[#9B8EC7]/60'
              }`}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4]' 
                  : 'border-[#BCCCDC]/30 focus:ring-[#9AA6B2] bg-[#D9EAFD]/80 text-[#9AA6B2]'
              }`}
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4]' 
                  : 'border-[#BCCCDC]/30 focus:ring-[#9AA6B2] bg-[#D9EAFD]/80 text-[#9AA6B2]'
              }`}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              onClick={addTask}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-white ${
                isToggled 
                  ? 'bg-gradient-to-r from-[#4A70A9] to-[#8FABD4] hover:shadow-lg' 
                  : 'bg-gradient-to-r from-[#9AA6B2] to-[#BCCCDC] hover:shadow-lg'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-[#D9EAFD]/80'
          }`}>
            <div className="text-3xl font-bold mb-2 " style={{ color: text }}>{tasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#9AA6B2]/80'
            }`}>Total Tasks</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-[#D9EAFD]/80'
          }`}>
            <div className="text-3xl font-bold mb-2 " style={{ color: text }}>{todayTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#9AA6B2]/80'
            }`}>Today's Tasks</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-[#D9EAFD]/80'
          }`}>
            <div className="text-3xl font-bold mb-2 " style={{ color: text }}>{completedTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#9AA6B2]/80'
            }`}>Completed</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-[#D9EAFD]/80'
          }`}>
            <div className="text-3xl font-bold mb-2 " style={{ color: text }}>{upcomingTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#9AA6B2]/80'
            }`}>Upcoming</div>
          </div>
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <div className="p-6 rounded-2xl shadow-lg " style={{ background: sidebar, borderColor: border }}>
            <h3 className="text-xl font-bold mb-4 " style={{ color: text }}>Today's Tasks</h3>
            <div className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className={`text-center py-8 ${
                  isToggled ? 'text-[#8FABD4]/60' : 'text-[#9AA6B2]/60'
                }`}>No tasks for today</p>
              ) : (
                todayTasks.map(task => (
                  <div key={task.id} className={`flex items-center p-3 rounded-lg border ${
                    isToggled ? 'border-[#4A70A9]/20 bg-[#4A70A9]/10' : 'border-[#BCCCDC]/20 bg-[#9B8EC7]/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 w-5 h-5 rounded"
                    />
                    <div className="flex-1">
                      <p className="${task.completed ? 'line-through opacity-60' : ''} " style={{ color: text }}>{task.title}</p>
                      <p className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()} PRIORITY
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Trash
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* All Tasks */}
          <div className="p-6 rounded-2xl shadow-lg " style={{ background: sidebar, borderColor: border }}>
            <h3 className="text-xl font-bold mb-4 " style={{ color: text }}>All Tasks</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className={`text-center py-8 ${
                  isToggled ? 'text-[#8FABD4]/60' : 'text-[#9AA6B2]/60'
                }`}>No tasks created yet</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className={`flex items-center p-3 rounded-lg border ${
                    isToggled ? 'border-[#4A70A9]/20 bg-[#4A70A9]/10' : 'border-[#BCCCDC]/20 bg-[#9B8EC7]/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 w-5 h-5 rounded"
                    />
                    <div className="flex-1">
                      <p className="${task.completed ? 'line-through opacity-60' : ''} " style={{ color: text }}>{task.title}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={getPriorityColor(task.priority)}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-[#9AA6B2]/60'}>
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Trash
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}

export default Scheduler