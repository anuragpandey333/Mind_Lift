const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// CORS first
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'MindLift API is running' })
})

// Auth routes
try {
  const authRoutes = require('./routes/auth')
  app.use('/api/auth', authRoutes)
} catch (error) {
  console.error('Auth routes error:', error)
}

// Other routes
try {
  const streakMiddleware = require('./middleware/streakMiddleware')
  app.use('/api/diet', streakMiddleware, require('./routes/diet'))
  app.use('/api/mood', streakMiddleware, require('./routes/mood'))
  app.use('/api/fitness', streakMiddleware, require('./routes/fitness'))
  app.use('/api/tasks', streakMiddleware, require('./routes/tasks'))
} catch (error) {
  console.error('Routes error:', error)
}

module.exports = app

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
