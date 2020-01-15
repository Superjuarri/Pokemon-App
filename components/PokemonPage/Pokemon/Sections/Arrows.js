import React, { useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import convertPokemonId from '../../../../lib/convertPokemonId'

import { PokemonContext } from '../../../contexts/PokemonContext'

const Wrapper = styled.div`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: grid;
  grid-template-areas: 'PrevPokemon NextPokemon';

  /* animation: ${slideInLeft} 0.5s ease-in-out 0s; */
`

const PokemonButton = styled.button`
  width: 50%;
  text-transform: capitalize;
  cursor: pointer;
`

const PrevPokemon = styled(PokemonButton)`
  grid-area: PrevPokemon;
  justify-self: start;
`

const NextPokemon = styled(PokemonButton)`
  grid-area: NextPokemon;
  justify-self: end;
`

const Arrows = () => {
  const { prevPokemon, nextPokemon } = useContext(PokemonContext)

  return (
    <Wrapper>
      {prevPokemon && (
        <Link href='/pokemon/[id]' as={`/pokemon/${prevPokemon.name}`}>
          <PrevPokemon>
            {prevPokemon.name} {convertPokemonId(prevPokemon.id)}
          </PrevPokemon>
        </Link>
      )}

      {nextPokemon && (
        <Link href='/pokemon/[id]' as={`/pokemon/${nextPokemon.name}`}>
          <NextPokemon>
            {nextPokemon.name} {convertPokemonId(nextPokemon.id)}
          </NextPokemon>
        </Link>
      )}
    </Wrapper>
  )
}

export default Arrows
