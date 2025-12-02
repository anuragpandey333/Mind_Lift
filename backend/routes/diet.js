const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

// Get personalized meal recommendations
router.get('/meals', auth, async (req, res) => {
  try {
    const mealPlans = {
      breakfast: [
        { name: 'Oatmeal with Berries', calories: 320, protein: 12, carbs: 58, fat: 6, mood: 'energizing' },
        { name: 'Greek Yogurt Parfait', calories: 280, protein: 20, carbs: 35, fat: 8, mood: 'calming' },
        { name: 'Avocado Toast', calories: 350, protein: 10, carbs: 30, fat: 22, mood: 'focus' }
      ],
      lunch: [
        { name: 'Quinoa Buddha Bowl', calories: 450, protein: 18, carbs: 65, fat: 15, mood: 'balanced' },
        { name: 'Grilled Chicken Salad', calories: 380, protein: 35, carbs: 20, fat: 18, mood: 'energizing' },
        { name: 'Lentil Soup', calories: 320, protein: 16, carbs: 50, fat: 8, mood: 'comforting' }
      ],
      dinner: [
        { name: 'Salmon with Vegetables', calories: 420, protein: 30, carbs: 25, fat: 22, mood: 'relaxing' },
        { name: 'Vegetable Stir Fry', calories: 350, protein: 12, carbs: 45, fat: 14, mood: 'light' },
        { name: 'Turkey Meatballs', calories: 380, protein: 28, carbs: 20, fat: 20, mood: 'satisfying' }
      ]
    }

    res.json({
      message: 'Meal plans retrieved successfully',
      mealPlans
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get mood-boosting foods
router.get('/mood-foods', auth, async (req, res) => {
  try {
    const moodFoods = [
      { category: 'Stress Relief', foods: ['Dark Chocolate', 'Green Tea', 'Blueberries', 'Almonds'] },
      { category: 'Energy Boost', foods: ['Bananas', 'Sweet Potatoes', 'Spinach', 'Eggs'] },
      { category: 'Focus Enhancement', foods: ['Fatty Fish', 'Walnuts', 'Broccoli', 'Coffee'] },
      { category: 'Mood Stabilizer', foods: ['Yogurt', 'Oats', 'Turkey', 'Beans'] }
    ]

    res.json({
      message: 'Mood foods retrieved successfully',
      moodFoods
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Save user's daily nutrition intake
router.post('/nutrition', auth, async (req, res) => {
  try {
    const { calories, protein, carbs, fat, waterIntake } = req.body
    
    // In a real app, you would save this to the database
    // For now, we'll just return a success message
    
    res.json({
      message: 'Nutrition data saved successfully',
      data: {
        userId: req.user.id,
        calories,
        protein,
        carbs,
        fat,
        waterIntake,
        date: new Date().toISOString().split('T')[0]
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router