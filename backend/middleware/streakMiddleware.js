const updateStreak = require('../utils/streak')

// Automatically updates streak on any mutating activity request
const streakMiddleware = (req, res, next) => {
  if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(req.method)) return next()

  const originalJson = res.json.bind(res)

  res.json = function (data) {
    // Only update streak on successful responses and when user is authenticated
    if (res.statusCode < 400 && req.user?.id) {
      updateStreak(req.user.id).catch(err =>
        console.error('Streak update failed:', err)
      )
    }
    return originalJson(data)
  }

  next()
}

module.exports = streakMiddleware
