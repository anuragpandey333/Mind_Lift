const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Get all mood entries for user
router.get('/', auth, async (req, res) => {
  try {
    const entries = await prisma.moodEntry.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create new mood entry
router.post('/', auth, async (req, res) => {
  try {
    const {
      mood,
      moodLabel,
      moodEmoji,
      stressLevel,
      trigger,
      note,
      sleepQuality,
      energyLevel,
      socialConnection,
      physicalActivity,
      mealPattern
    } = req.body

    const entry = await prisma.moodEntry.create({
      data: {
        userId: req.user.id,
        mood,
        moodLabel,
        moodEmoji,
        stressLevel,
        trigger,
        note,
        sleepQuality,
        energyLevel,
        socialConnection,
        physicalActivity,
        mealPattern
      }
    })

    res.status(201).json(entry)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete mood entry
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.moodEntry.delete({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json({ message: 'Entry deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router