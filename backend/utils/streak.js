const prisma = require('../lib/prisma')

const toDateStr = (date = new Date()) => {
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60 * 1000)
  return local.toISOString().split('T')[0]
}

const diffDays = (a, b) => {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round((new Date(b) - new Date(a)) / msPerDay)
}

const updateStreak = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, longestStreak: true, lastActivityDate: true }
  })

  const today = toDateStr()
  const last = user.lastActivityDate

  let currentStreak = user.currentStreak ?? 0
  let longestStreak = user.longestStreak ?? 0

  if (!last) {
    currentStreak = 1
  } else if (last === today) {
    return { currentStreak, longestStreak, lastActivityDate: last }
  } else {
    const gap = diffDays(last, today)
    currentStreak = gap === 1 ? currentStreak + 1 : 1
  }

  longestStreak = Math.max(longestStreak, currentStreak)

  await prisma.user.update({
    where: { id: userId },
    data: { currentStreak, longestStreak, lastActivityDate: today }
  })

  return { currentStreak, longestStreak, lastActivityDate: today }
}

module.exports = updateStreak
