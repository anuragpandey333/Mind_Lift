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

// CORS configuration
const corsOptions = {
  origin: ['https://mind-lift-28xy.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

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
