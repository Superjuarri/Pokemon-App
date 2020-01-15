import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto:400i&display=swap');

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

export default GlobalStyle
