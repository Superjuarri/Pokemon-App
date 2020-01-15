import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { bgColorBuilder } from '../../../styles/keyFrames'

const pageVarients = {
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  },
  exit: {
    opacity: 0.25,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

const Wrapper = styled(motion.div)`
  padding: 50px 0;
  display: grid;
  gap: 50px;
  background-color: ${({ color }) => color};

  /* animation: ${({ color }) => bgColorBuilder(color)} 0.25s ease-in-out 1; */
`

const PokemonSections = () => {
  return (
    <Wrapper
      key={`No Pokemon`}
      initial='exit'
      animate='enter'
      exit='exit'
      variants={pageVarients}
    >
      <h1>No pokes found ;-;</h1>
    </Wrapper>
  )
}

export default PokemonSections
