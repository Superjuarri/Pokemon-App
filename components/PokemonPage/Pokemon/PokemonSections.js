import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { bgColorBuilder } from '../../../styles/keyFrames'

import { PokemonContext } from '../../contexts/PokemonContext'

import Arrows from './Sections/Arrows'
import InfoSection from './Sections/InfoSection'
import SpeciesSection from './Sections/SpeciesSection'
import AbilitiesSection from './Sections/AbilitiesSection'
import StatsSection from './Sections/StatsSection'
import EvolutionsSection from './Sections/EvolutionsSection'

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
  const {
    pokemon,
    pokemonSpecies,
    pokemonEvolutions,
    prevPokemon,
    nextPokemon,
    colorPalette
  } = useContext(PokemonContext)

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        pokemonSpecies,
        pokemonEvolutions,
        prevPokemon,
        nextPokemon,
        colorPalette
      }}
    >
      <Wrapper
        color={colorPalette[0].color}
        key={`kappa`}
        initial='exit'
        animate='enter'
        exit='exit'
        variants={pageVarients}
      >
        <Arrows />
        <InfoSection />
        <SpeciesSection />
        <AbilitiesSection />
        <StatsSection />
        <EvolutionsSection />
      </Wrapper>
    </PokemonContext.Provider>
  )
}

export default PokemonSections
