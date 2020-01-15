import React, { forwardRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import getColorPalette from '../lib/getColorPalette'
import getTypeColor from '../lib/getTypeColor'
import convertPokemonId from '../lib/convertPokemonId'

const CellWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`

const Cell = styled.div.attrs(props => ({
  color: props.color || '#eee'
}))`
  display: grid;
  width: 100%;
  height: 100%;

  padding: 20px;

  background: ${props => props.color};

  cursor: pointer;
`

const PokemonTitle = styled.p`
  text-transform: capitalize;
  color: white;
`

const PokemonImg = styled.img`
  justify-self: center;
  /* height: 120%; */
  width: auto;
  /* filter: drop-shadow(2px 5px 6px white); */
`

const PokemonTypes = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
`

const PokemonType = styled.p.attrs(props => ({
  type: props.type || '#fff'
}))`
  text-transform: capitalize;

  margin: 20px 0 0 0;
  padding: 0;
  color: #ffffff;
  padding: 0.25rem 1.5rem;
  border-radius: 15px;
  text-transform: capitalize;
  background-color: ${props => props.type};
`

const pokemonVariants = {
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

const PokemonCell = forwardRef(({ pokemon }, ref) => {
  const { colorPalette } = getColorPalette(pokemon.sprites.front_default)

  return (
    <CellWrapper variants={pokemonVariants}>
      <Link href='/pokemon/[id]' as={`/pokemon/${pokemon.name}`}>
        <Cell color={colorPalette[0].color} ref={ref}>
          <PokemonTitle>
            {convertPokemonId(pokemon.id)} <span>{pokemon.name}</span>
          </PokemonTitle>
          <PokemonImg src={pokemon.sprites.front_default}></PokemonImg>
          <PokemonTypes>
            {pokemon.types.map((type, index) => (
              <PokemonType key={index} type={getTypeColor(type.type.name)}>
                {type.type.name}
              </PokemonType>
            ))}
          </PokemonTypes>
        </Cell>
      </Link>
    </CellWrapper>
  )
})

const Grid = styled.div`
  margin: 50px auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: grid;
  gap: 20px;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const PokemonGrid = ({ allPokemon, lastPokemonElementRef }) => {
  return (
    <Grid variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
      {allPokemon.map((pokemon, index) => {
        if (allPokemon.length === index + 1) {
          return (
            <PokemonCell
              key={index}
              ref={lastPokemonElementRef}
              pokemon={pokemon}
            />
          )
        } else {
          return <PokemonCell key={index} pokemon={pokemon} />
        }
      })}
    </Grid>
  )
}

export default PokemonGrid
