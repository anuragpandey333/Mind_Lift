const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const dietRoutes = require('./routes/diet')

const app = express()

// Middleware
app.use(cors({
  origin:"*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.sendStatus(200)
})

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

app.get('/api/health', async (req, res) => {
  try {
    const prisma = require('./lib/prisma')
    await prisma.$connect()
    await prisma.$disconnect()
    res.json({ status: 'OK', database: 'Connected' })
  } catch (error) {
    res.status(500).json({ status: 'Error', database: 'Disconnected', error: error.message })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/diet', dietRoutes)
app.use('/api/mood', require('./routes/mood'))
app.use('/api/fitness', require('./routes/fitness'))
app.use('/api/tasks', require('./routes/tasks'))

const PORT = process.env.PORT || 5001

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// Export for Vercel
module.exports = app