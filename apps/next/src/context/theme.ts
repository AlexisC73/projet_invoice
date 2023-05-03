import React from 'react'

const ThemeCtx = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
})

export default ThemeCtx
