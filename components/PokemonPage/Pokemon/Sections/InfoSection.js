import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { PokemonContext } from '../../../contexts/PokemonContext'

import { opacity, slideInLeft } from '../../../../styles/keyFrames'

import convertPokemonId from '../../../../lib/convertPokemonId'
import getTypeColor from '../../../../lib/getTypeColor'

const Wrapper = styled(motion.section)`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};
  padding: 20px;

  background-color: #fff;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  grid-template-areas:
    'InfoSectionTop PokemonInfoImage'
    'InfoSectionMiddle PokemonInfoImage'
    'InfoSectionBottom PokemonInfoImage';

  /* animation: ${slideInLeft} 0.5s ease-in-out 0s; */
`

const InfoSectionTop = styled.div`
  display: flex;
  flex-direction: row;

  align-items: baseline;
  justify-content: space-between;
  grid-area: InfoSectionTop;
`

const Name = styled.h3`
  text-transform: capitalize;
`

const InfoSectionMiddle = styled.div`
  grid-area: InfoSectionMiddle;
`

const InfoSectionBottom = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: start;
  justify-content: space-between;
  text-align: center;
  grid-area: InfoSectionBottom;
`

const PokemonInfoImage = styled.img`
  filter: ${({ color }) => `drop-shadow(2px 5px 6px ${color})`};

  grid-area: PokemonInfoImage;
  align-self: center;
  justify-self: center;
`

const PokemonType = styled.p`
  /* width: 100%; */
  margin: 0;
  padding: 0;
  color: #ffffff;
  padding: 0.25rem 1.5rem;
  border-radius: 15px;
  text-transform: capitalize;
  background-color: ${({ type }) => type};
`

const wrapperVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

const InfoSection = () => {
  const { pokemon, pokemonSpecies, colorPalette } = useContext(PokemonContext)

  return (
    <AnimatePresence>
      <Wrapper
        color={colorPalette[0].color}
        key='InfoSectionWrapper'
        initial='exit'
        animate='enter'
        exit='exit'
        variants={wrapperVariants}
      >
        <InfoSectionTop>
          <Name>{pokemon.name}</Name>
          <p>{convertPokemonId(pokemon.id)}</p>
        </InfoSectionTop>
        <InfoSectionMiddle>
          <p>{pokemonSpecies.genera[2].genus}</p>
        </InfoSectionMiddle>
        <InfoSectionBottom>
          {pokemon.types.map((type, index) => (
            <PokemonType key={index} type={getTypeColor(type.type.name)}>
              {type.type.name}
            </PokemonType>
          ))}
        </InfoSectionBottom>

        <PokemonInfoImage
          src={pokemon.sprites.front_default}
          color={colorPalette[0].color}
        />
      </Wrapper>
    </AnimatePresence>
  )
}

export default InfoSection
