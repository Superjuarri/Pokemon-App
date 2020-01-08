import App from 'next/app'
import React from 'react'
import { Normalize } from 'styled-normalize'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import theme from '../lib/theme'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
      font-family: ${({ theme }) => theme.font.fontFamily};
      color: ${({ theme }) => theme.colors.fontRegular};
      overflow-x: hidden;
   }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.fontDark};
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Normalize />
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </>
    )
  }
}
