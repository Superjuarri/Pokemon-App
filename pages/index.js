import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Layout from '../components/Layout/Layout'
import Header from '../components/IndexPage/Header'
import PokedexSection from '../components/IndexPage/PokedexSection'
import MovesSection from '../components/IndexPage/MovesSection'

const pageVarients = {
  enter: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  },
  exit: {
    x: '100vw',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.48, 0.15, 0.25, 0.96],
      staggerChildren: 0.1
    }
  }
}

const Wrapper = styled(motion.div)`
  background-color: #ffffff;
`

const IndexPage = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <Layout>
      <Wrapper
        key='IndexWrapper'
        initial='exit'
        animate='enter'
        exit='exit'
        variants={pageVarients}
      >
        <Header />
        <PokedexSection />
        <MovesSection />
      </Wrapper>
    </Layout>
  )
}
export default IndexPage
