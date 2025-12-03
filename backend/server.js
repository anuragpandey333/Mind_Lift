const express = require('express')
const cors = require('cors')
require('dotenv').config()

const prisma = require('./lib/prisma')
const authRoutes = require('./routes/auth')
const dietRoutes = require('./routes/diet')

// Database connection
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection failed:', err)
    process.exit(1)
  })

const app = express()

// Handle OPTIONS requests first
app.options('*', (req, res) => {
  const allowedOrigins = ['https://mind-lift-28xy.vercel.app', 'http://localhost:5173']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.status(200).end()
})

// CORS middleware for actual requests
app.use((req, res, next) => {
  const allowedOrigins = ['https://mind-lift-28xy.vercel.app', 'http://localhost:5173']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

app.use('/api/auth', authRoutes)
app.use('/api/diet', dietRoutes)
app.use('/api/mood', require('./routes/mood'))
app.use('/api/fitness', require('./routes/fitness'))
app.use('/api/tasks', require('./routes/tasks'))

// ✅ ONLY THIS FOR VERCEL
module.exports = app

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
