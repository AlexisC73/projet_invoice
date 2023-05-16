import ThemeCtx from '@/context/theme'
import { useTheme } from '@/hooks/useTheme'
import { store } from '@/store/store'
import { isConnected } from '@/store/user/user'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const { themeCtx } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (store.getState().user.status === 'idle') {
      store.dispatch(isConnected())
    }
  }, [router.pathname])

  return (
    <ThemeCtx.Provider value={themeCtx}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeCtx.Provider>
  )
}
