import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [isToggled, setIsToggled] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    const handler = () => setIsToggled(localStorage.getItem('theme') === 'dark')
    window.addEventListener('themechange', handler)
    return () => window.removeEventListener('themechange', handler)
  }, [])

  const toggleTheme = () => {
    const next = !isToggled
    setIsToggled(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    window.dispatchEvent(new Event('themechange'))
  }

  return { isToggled, toggleTheme }
}
