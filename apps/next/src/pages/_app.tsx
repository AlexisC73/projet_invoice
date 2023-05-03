import ThemeCtx from '@/context/theme'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const body = document.body
    if (darkMode) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const themeCtx = {
    darkMode,
    toggleDarkMode,
  }

  return (
    <ThemeCtx.Provider value={themeCtx}>
      <Component {...pageProps} />
    </ThemeCtx.Provider>
  )
}
