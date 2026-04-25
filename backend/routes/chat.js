const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/ai', auth, async (req, res) => {
  const { messages } = req.body
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: 'Messages array is required' })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are MindLift AI, a mental wellness and productivity assistant for college students. Help with stress, study tips, motivation, fitness, diet, and emotional support. Be concise, warm, and practical.'
          },
          ...messages
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ message: data.error?.message || 'Groq API error' })
    }

    res.json({ reply: data.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router
