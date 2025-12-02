const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Get diet plan for today
router.get('/plan', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const dietPlan = await prisma.dietPlan.findFirst({
      where: { 
        userId: req.user.id,
        date: today
      },
      include: { meals: true }
    })
    res.json(dietPlan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create/Update diet plan
router.post('/plan', auth, async (req, res) => {
  try {
    const { date, waterIntake } = req.body
    const planDate = date || new Date().toISOString().split('T')[0]
    
    let dietPlan = await prisma.dietPlan.findFirst({
      where: { userId: req.user.id, date: planDate },
      include: { meals: true }
    })
    
    if (dietPlan) {
      dietPlan = await prisma.dietPlan.update({
        where: { id: dietPlan.id },
        data: { waterIntake },
        include: { meals: true }
      })
    } else {
      dietPlan = await prisma.dietPlan.create({
        data: { 
          userId: req.user.id, 
          date: planDate,
          waterIntake: waterIntake || 0
        },
        include: { meals: true }
      })
    }
    
    res.json(dietPlan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Add meal to diet plan
router.post('/meals', auth, async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, type } = req.body
    const today = new Date().toISOString().split('T')[0]
    
    // Get or create diet plan for today
    let dietPlan = await prisma.dietPlan.findFirst({
      where: { userId: req.user.id, date: today }
    })
    
    if (!dietPlan) {
      dietPlan = await prisma.dietPlan.create({
        data: { userId: req.user.id, date: today }
      })
    }
    
    const meal = await prisma.meal.create({
      data: {
        dietPlanId: dietPlan.id,
        name,
        calories,
        protein,
        carbs,
        fat,
        type
      }
    })
    
    res.status(201).json(meal)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Toggle meal consumption
router.patch('/meals/:id', auth, async (req, res) => {
  try {
    const { consumed } = req.body
    
    const meal = await prisma.meal.update({
      where: { id: req.params.id },
      data: { consumed }
    })
    
    res.json(meal)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete meal
router.delete('/meals/:id', auth, async (req, res) => {
  try {
    await prisma.meal.delete({
      where: { id: req.params.id }
    })
    res.json({ message: 'Meal deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router