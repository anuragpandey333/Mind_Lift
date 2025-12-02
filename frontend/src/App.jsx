import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Features from './components/Features'
import About from './components/About'
import Contact from './components/Contact'
import Ai from './components/Ai'
import Scheduler from './components/Scheduler'
import DietPlanner from './components/DietPlanner'
import FitnessTracker from './components/FitnessTracker'
import MoodTracker from './components/MoodTracker'
import Mentorship from './components/Mentorship'
import TaskScheduler from './components/TaskScheduler'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/signup" 
            element={!isAuthenticated ? <Signup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/features" 
            element={isAuthenticated ? <Features /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/about" 
            element={isAuthenticated ? <About /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/contact" 
            element={isAuthenticated ? <Contact /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/ai" 
            element={isAuthenticated ? <Ai /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/scheduler" 
            element={isAuthenticated ? <Scheduler /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/task-scheduler" 
            element={isAuthenticated ? <TaskScheduler /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/diet" 
            element={isAuthenticated ? <DietPlanner /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/fitness" 
            element={isAuthenticated ? <FitnessTracker /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mood" 
            element={isAuthenticated ? <MoodTracker /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mentorship" 
            element={isAuthenticated ? <Mentorship /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
