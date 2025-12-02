const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body
    
    const task = await prisma.task.create({
      data: {
        userId: req.user.id,
        title,
        description,
        priority,
        category,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    })
    
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update task
router.patch('/:id', auth, async (req, res) => {
  try {
    const { completed, title, description, priority, category, dueDate } = req.body
    
    const task = await prisma.task.update({
      where: { 
        id: req.params.id,
        userId: req.user.id
      },
      data: {
        ...(completed !== undefined && { completed }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(priority && { priority }),
        ...(category && { category }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
      }
    })
    
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.task.delete({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    })
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router