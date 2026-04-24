const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const prisma = require('../lib/prisma')
const auth = require('../middleware/auth')

const router = express.Router()
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI)


router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

  
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

   
    await prisma.$connect()


    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

 
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body


    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

   
    await prisma.$connect()
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        profilePhoto: true,
        bio: true,
        phone: true,
        location: true
      }
    })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

   
    if (!user.password) {
      return res.status(400).json({ message: 'This account uses Google login. Please sign in with Google.' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }


    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        phone: user.phone,
        location: user.location
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

router.get('/me', auth, async (req, res) => {
  try {
    console.log('Fetching user with ID:', req.user.id)
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePhoto: true,
        bio: true,
        phone: true,
        location: true,
        currentStreak: true,
        longestStreak: true,
        lastActivityDate: true
      }
    })
    
    console.log('Fetched user data:', user)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.json({ user })
  } catch (error) {
    console.error('Error in /me route:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})




router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, profilePhoto, bio, phone, location } = req.body
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name,
        email,
        ...(profilePhoto !== undefined && { profilePhoto }),
        ...(bio !== undefined && { bio }),
        ...(phone !== undefined && { phone }),
        ...(location !== undefined && { location })
      }
    })

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePhoto: updatedUser.profilePhoto,
        bio: updatedUser.bio,
        phone: updatedUser.phone,
        location: updatedUser.location
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})




// Google OAuth - redirect to Google
router.get('/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`
  res.redirect(url)
})

// Google OAuth - callback
router.get('/google/callback', async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5174'
  try {
    const { code } = req.query
    if (!code) return res.redirect(`${frontendUrl}/login?error=no_code`)

    // Exchange code for tokens
    const tokenRes = await googleClient.getToken(code)
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenRes.tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const { sub: googleId, email, name, picture } = ticket.getPayload()

    await prisma.$connect()
    let user = await prisma.user.findFirst({ where: { OR: [{ googleId }, { email }] } })

    if (user) {
      if (!user.googleId) await prisma.user.update({ where: { id: user.id }, data: { googleId } })
    } else {
      user = await prisma.user.create({ data: { name, email, googleId, profilePhoto: picture } })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    const userParam = encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role, profilePhoto: user.profilePhoto }))
    res.redirect(`${frontendUrl}/auth/google/callback?token=${token}&user=${userParam}`)
  } catch (error) {
    console.error('Google OAuth error:', error)
    res.redirect(`${frontendUrl}/login?error=oauth_failed`)
  }
})

router.get('/test-redirect', (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
  res.send(`
    <html>
      <head><title>Test Redirect</title></head>
      <body>
        <p>Test redirect working! Redirecting to homepage...</p>
        <script>
          setTimeout(() => {
            window.location.href = '${frontendUrl}/?test=success';
          }, 2000);
        </script>
      </body>
    </html>
  `)
})





module.exports = router