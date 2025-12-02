const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true, profilePhoto: true, bio: true, phone: true, location: true }
    })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = auth