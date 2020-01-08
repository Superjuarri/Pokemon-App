import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import Footer from './Footer'

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1 0 auto;
`

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  )
}

export default Layout
