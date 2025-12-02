const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Get fitness profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await prisma.fitnessProfile.findUnique({
      where: { userId: req.user.id }
    })
    res.json(profile)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create/Update fitness profile
router.post('/profile', auth, async (req, res) => {
  try {
    const { weight, height, age, selectedDay } = req.body
    
    const profile = await prisma.fitnessProfile.upsert({
      where: { userId: req.user.id },
      update: { weight, height, age, selectedDay },
      create: { userId: req.user.id, weight, height, age, selectedDay }
    })
    
    res.json(profile)
  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get workouts
router.get('/workouts', auth, async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Add workout
router.post('/workouts', auth, async (req, res) => {
  try {
    const { name, duration, calories, type, date, completed } = req.body
    
    const workout = await prisma.workout.create({
      data: {
        userId: req.user.id,
        name,
        duration,
        calories,
        type,
        date: date || new Date().toISOString().split('T')[0],
        completed: completed || false
      }
    })
    
    res.status(201).json(workout)
  } catch (error) {
    console.error('Workout error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Toggle workout completion
router.patch('/workouts/:id', auth, async (req, res) => {
  try {
    const { completed } = req.body
    
    const workout = await prisma.workout.update({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      data: { completed }
    })
    
    res.json(workout)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete workout
router.delete('/workouts/:id', auth, async (req, res) => {
  try {
    await prisma.workout.delete({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json({ message: 'Workout deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router