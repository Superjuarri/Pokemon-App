import App from 'next/app'
import React from 'react'
import { Normalize } from 'styled-normalize'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'

import GlobalStyle from '../styles/globalStyles'
import theme from '../styles/theme'

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props
    return (
      <>
        <Normalize />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </>
    )
  }
}
