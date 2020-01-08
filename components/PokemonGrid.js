import React, { forwardRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import chroma from 'chroma-js'

import getColorPalette from '../lib/getColorPalette'
import getTypeColor from '../lib/getTypeColor'

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

const PokemonCell = forwardRef(({ pokemon }, ref) => {
  const { colorPalette } = getColorPalette(pokemon.sprites.front_default)

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Cell color={colorPalette[0].color} ref={ref}>
        <PokemonTitle>
          {pokemon.id}. <span>{pokemon.name}</span>
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
    <Grid>
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
