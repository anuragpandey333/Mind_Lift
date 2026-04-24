import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import NewLogin from './components/NewLogin'
import NewSignup from './components/NewSignup'
import Layout from './components/Layout'
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
import GoogleCallback from './components/GoogleCallback'

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
          <Route path="/login" element={!isAuthenticated ? <NewLogin setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <NewSignup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
          <Route path="/auth/google/callback" element={<GoogleCallback setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />

          {/* All authenticated routes share the Layout (fixed sidebar) */}
          <Route element={isAuthenticated ? <Layout setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/fitness" element={<FitnessTracker />} />
            <Route path="/diet" element={<DietPlanner />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/ai" element={<Ai />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/task-scheduler" element={<TaskScheduler />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
