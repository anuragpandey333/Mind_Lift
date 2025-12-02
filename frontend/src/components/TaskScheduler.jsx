import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TaskScheduler = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState(false)
  const [tasks, setTasks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Fetching tasks with token:', token ? 'exists' : 'missing')
      
      const response = await axios.get('http://localhost:5001/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      console.log('Tasks response:', response.data)
      setTasks(response.data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message)
      setTasks([])
    }
  }

  const addTask = async () => {
    if (!newTask.title.trim()) {
      alert('Please enter a task title')
      return
    }
    
    console.log('Adding task:', newTask)
    
    try {
      const token = localStorage.getItem('token')
      console.log('Token:', token ? 'exists' : 'missing')
      
      // Add to UI immediately
      const tempTask = {
        ...newTask,
        id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTasks(prev => [tempTask, ...prev])
      
      const response = await axios.post('http://localhost:5001/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      console.log('Task added successfully:', response.data)
      setNewTask({ title: '', description: '', priority: 'medium', category: 'personal', dueDate: '' })
      setShowAddForm(false)
      
      // Refresh from database to get real ID
      setTimeout(() => fetchTasks(), 500)
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message)
      alert('Failed to add task. Please check console for details.')
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    if (filter === 'high') return task.priority === 'high'
    return true
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isToggled 
        ? 'bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#333333]' 
        : 'bg-gradient-to-br from-[#EFECE3] via-[#f5f2e9] to-[#e8e5dc]'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-md shadow-sm border-b transition-all duration-500 ${
        isToggled 
          ? 'bg-[#000000]/90 border-[#4A70A9]/30' 
          : 'bg-[#EFECE3]/80 border-[#8FABD4]/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-[#4A70A9] hover:bg-[#8FABD4]/20'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className={`text-xl sm:text-2xl font-bold ${
                isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
              }`}>Task Scheduler</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isToggled 
                  ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80 text-white' 
                  : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80 text-white'
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'completed', 'high'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 capitalize ${
                filter === filterType
                  ? isToggled ? 'bg-[#4A70A9] text-white' : 'bg-[#8FABD4] text-white'
                  : isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-[#4A70A9] hover:bg-[#8FABD4]/20'
              }`}
            >
              {filterType === 'high' ? 'High Priority' : filterType}
            </button>
          ))}
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className={`p-6 rounded-2xl shadow-lg mb-6 ${
            isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isToggled ? 'text-[#8FABD4]' : 'text-[#4A70A9]'
            }`}>Add New Task</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-[#8FABD4]'
                }`}
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-[#8FABD4]'
                }`}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-[#8FABD4]'
                }`}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="health">Health</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  isToggled 
                    ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                    : 'bg-white border-gray-300 text-gray-800 focus:border-[#8FABD4]'
                }`}
              />
            </div>
            <textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className={`w-full p-3 rounded-lg border mt-4 transition-all duration-300 ${
                isToggled 
                  ? 'bg-[#000000]/40 border-[#8FABD4]/30 text-[#8FABD4] focus:border-[#4A70A9]'
                  : 'bg-white border-gray-300 text-gray-800 focus:border-[#8FABD4]'
              }`}
              rows="3"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={addTask}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isToggled 
                    ? 'bg-[#4A70A9] hover:bg-[#4A70A9]/80 text-white' 
                    : 'bg-[#8FABD4] hover:bg-[#8FABD4]/80 text-white'
                }`}
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isToggled ? 'text-[#8FABD4] hover:bg-[#4A70A9]/20' : 'text-[#4A70A9] hover:bg-[#8FABD4]/20'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`p-4 rounded-2xl shadow-lg transition-all duration-300 ${
              isToggled ? 'bg-[#000000]/60' : 'bg-white/90'
            } ${task.completed ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'line-through' : ''} ${
                      isToggled ? 'text-[#8FABD4]' : 'text-gray-800'
                    }`}>{task.title}</h3>
                    {task.description && (
                      <p className={`text-sm mt-1 ${
                        isToggled ? 'text-[#8FABD4]/80' : 'text-gray-600'
                      }`}>{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isToggled ? 'bg-[#4A70A9]/20 text-[#8FABD4]' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.category}
                      </span>
                      {task.dueDate && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isToggled ? 'bg-[#8FABD4]/20 text-[#8FABD4]' : 'bg-purple-100 text-purple-800'
                        }`}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className={`text-center py-8 ${
              isToggled ? 'text-[#8FABD4]/60' : 'text-gray-500'
            }`}>
              No tasks found. Add your first task to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskScheduler