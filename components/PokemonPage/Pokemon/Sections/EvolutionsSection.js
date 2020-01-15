import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import getTypeColor from '../../../../lib/getTypeColor'
import convertPokemonId from '../../../../lib/convertPokemonId'

import { PokemonContext } from '../../../contexts/PokemonContext'

const EvolutionWrapper = styled.div`
  background: white;
  padding: 25px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};

  cursor: pointer;
`

const EvolutionImg = styled.img`
  filter: ${({ color }) => `drop-shadow(2px 5px 6px ${color})`};
`

const EvolutionId = styled.p`
  text-align: center;
  text-transform: capitalize;
`

const EvolutionName = styled.p`
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
`

const EvolutionTypes = styled.div`
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  gap: 20px;
`

const EvolutionType = styled.p`
  margin: 0;
  padding: 0.25rem 1.5rem;
  color: #fff;
  text-transform: capitalize;
  border-radius: 15px;
  background-color: ${({ type }) => type};
`

const Evolution = ({ id, colorPalette }) => {
  const [loading, setLoading] = useState(true)
  const [species, setSpecies] = useState(null)
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const pokemon = await pokemonRes.json()

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      )
      const species = await speciesRes.json()

      setPokemon(pokemon)
      setSpecies(species)
      setLoading(false)
    }
    fetchPokemon(id)
  }, [])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Link href={`/pokemon/[id]`} as={`/pokemon/${pokemon.id}`}>
          <EvolutionWrapper>
            <EvolutionImg
              src={pokemon.sprites.front_default}
              color={colorPalette[0].color}
            />
            <EvolutionId>{convertPokemonId(pokemon.id)}</EvolutionId>
            <EvolutionName>{pokemon.name}</EvolutionName>
            <EvolutionTypes>
              {pokemon.types.map((type, index) => (
                <EvolutionType key={index} type={getTypeColor(type.type.name)}>
                  {type.type.name}
                </EvolutionType>
              ))}
            </EvolutionTypes>
          </EvolutionWrapper>
        </Link>
      )}
    </>
  )
}

const Wrapper = styled.section`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media screen and (max-width: 600px) {
    display: grid;
    gap: 25px;
  }
`

const EvolutionsSection = () => {
  const { pokemonEvolutions, colorPalette } = useContext(PokemonContext)

  return (
    <Wrapper>
      {pokemonEvolutions.map((evolution, index) => (
        <Evolution
          key={index}
          id={evolution.species_name}
          colorPalette={colorPalette}
        />
      ))}
    </Wrapper>
  )
}

export default EvolutionsSection
