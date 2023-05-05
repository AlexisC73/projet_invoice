import ThemeCtx from '@/context/theme'
import { store } from '@/store/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

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
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeCtx.Provider>
  )
}
