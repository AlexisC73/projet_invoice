import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const themeCtx = {
    darkMode,
    toggleDarkMode,
  }

  useEffect(() => {
    const body = document.body
    if (darkMode) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }, [darkMode])

  return { themeCtx }
}
