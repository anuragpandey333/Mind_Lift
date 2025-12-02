import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Scheduler = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [taskPriority, setTaskPriority] = useState('medium')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5001/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setTasks([])
    }
  }

  const toggleTheme = () => {
    const newTheme = !isToggled
    setIsToggled(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const addTask = async () => {
    if (!newTask.trim()) return
    
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5001/api/tasks', {
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
      await axios.patch(`http://localhost:5001/api/tasks/${id}`, {
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
      await axios.delete(`http://localhost:5001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      setTasks([])
      localStorage.setItem('tasks', JSON.stringify([]))
    }
  }

  const todayTasks = tasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0])
  const upcomingTasks = tasks.filter(task => task.dueDate > new Date().toISOString().split('T')[0])
  const completedTasks = tasks.filter(task => task.completed)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return isToggled ? 'text-red-400' : 'text-red-600'
      case 'medium': return isToggled ? 'text-yellow-400' : 'text-yellow-600'
      case 'low': return isToggled ? 'text-green-400' : 'text-green-600'
      default: return isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
    }
  }

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
                onClick={() => navigate('/dashboard')}
                className={`text-3xl font-semibold bg-clip-text text-transparent tracking-wider transition-all duration-500 hover:opacity-80 ${
                  isToggled 
                    ? 'bg-gradient-to-r from-[#8FABD4] via-[#4A70A9] to-[#8FABD4]' 
                    : 'bg-gradient-to-r from-[#4A70A9] via-[#8FABD4] to-[#4A70A9]'
                }`}
              >
                MindLift
              </button>
            </div>
            
            <button
              onClick={() => navigate('/dashboard')}
              className={`text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isToggled 
                  ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/90' 
                  : 'bg-[#8FABD4] hover:bg-[#8FABD4]/90'
              }`}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
          }`}>📅 Task Scheduler</h1>
          <p className={`text-lg ${
            isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
          }`}>Organize your tasks and manage your daily routine</p>
        </div>

        {/* Add Task Section */}
        <div className={`p-6 rounded-2xl shadow-lg mb-8 ${
          isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Add New Task</h2>
            {tasks.length > 0 && (
              <button
                onClick={clearAllTasks}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white"
              >
                🗑️ Clear All
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
                  : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000] placeholder-[#000000]/70'
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
                  : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000]'
              }`}
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 ${
                isToggled 
                  ? 'border-[#4A70A9]/30 focus:ring-[#4A70A9] bg-[#000000] text-[#8FABD4]' 
                  : 'border-[#8FABD4]/30 focus:ring-[#8FABD4] bg-[#8FABD4]/10 text-[#000000]'
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
                  : 'bg-gradient-to-r from-[#8FABD4] to-[#4A70A9] hover:shadow-lg'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>{tasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Total Tasks</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>{todayTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Today's Tasks</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>{completedTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Completed</div>
          </div>
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/80'
          }`}>
            <div className={`text-3xl font-bold mb-2 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>{upcomingTasks.length}</div>
            <div className={`text-sm font-medium ${
              isToggled ? 'text-[#8FABD4]/80' : 'text-[#000000]/80'
            }`}>Upcoming</div>
          </div>
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Tasks */}
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>Today's Tasks</h3>
            <div className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className={`text-center py-8 ${
                  isToggled ? 'text-[#8FABD4]/60' : 'text-[#000000]/60'
                }`}>No tasks for today</p>
              ) : (
                todayTasks.map(task => (
                  <div key={task.id} className={`flex items-center p-3 rounded-lg border ${
                    isToggled ? 'border-[#4A70A9]/20 bg-[#4A70A9]/10' : 'border-[#8FABD4]/20 bg-[#8FABD4]/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 w-5 h-5 rounded"
                    />
                    <div className="flex-1">
                      <p className={`${task.completed ? 'line-through opacity-60' : ''} ${
                        isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                      }`}>{task.title}</p>
                      <p className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()} PRIORITY
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* All Tasks */}
          <div className={`p-6 rounded-2xl shadow-lg ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
            }`}>All Tasks</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className={`text-center py-8 ${
                  isToggled ? 'text-[#8FABD4]/60' : 'text-[#000000]/60'
                }`}>No tasks created yet</p>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className={`flex items-center p-3 rounded-lg border ${
                    isToggled ? 'border-[#4A70A9]/20 bg-[#4A70A9]/10' : 'border-[#8FABD4]/20 bg-[#8FABD4]/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mr-3 w-5 h-5 rounded"
                    />
                    <div className="flex-1">
                      <p className={`${task.completed ? 'line-through opacity-60' : ''} ${
                        isToggled ? 'text-[#8FABD4]' : 'text-[#000000]'
                      }`}>{task.title}</p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className={getPriorityColor(task.priority)}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className={isToggled ? 'text-[#8FABD4]/60' : 'text-[#000000]/60'}>
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scheduler