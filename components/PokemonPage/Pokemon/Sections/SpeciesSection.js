import React, { useContext } from 'react'
import styled from 'styled-components'

import { PokemonContext } from '../../../contexts/PokemonContext'

const Wrapper = styled.section`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: flex;
  flex-direction: column;

  background: white;
  padding: 25px 0;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};
`

const SectionTitle = styled.h3`
  text-align: center;
`

const FlavorText = styled.p`
  /* margin: auto auto; */
  padding: 20px;
  align-self: center;
  width: 75%;
  text-align: center;

  border: 1px solid #ddd;
  border-radius: 10px;
`

const FlavorTextVersion = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.fontLight};
  margin: 0 auto;
  text-align: center;
`

const Sizes = styled.div`
  display: flex;
  justify-content: space-around;
`

const Size = styled.div`
  text-align: center;

  p:first-child {
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  p:nth-child(2) {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.fontLight};
  }
`

const SpeciesSection = () => {
  const { pokemon, pokemonSpecies } = useContext(PokemonContext)

  const realFeet = (pokemon.height / 10) * 3.2808
  const feet = Math.floor(realFeet)
  const inches = Math.round((realFeet - feet) * 12)

  const weightKg = pokemon.weight / 10
  const weightLb = Math.floor(weightKg * 2.2046)

  return (
    <Wrapper>
      <SectionTitle>Species</SectionTitle>
      <FlavorText>
        {
          pokemonSpecies.flavor_text_entries.filter(
            entry => entry.language.name === 'en'
          )[0].flavor_text
        }
      </FlavorText>
      <FlavorTextVersion>
        Pokedex entry from {''}
        {
          pokemonSpecies.flavor_text_entries.filter(
            entry => entry.language.name === 'en'
          )[0].version.name
        }
      </FlavorTextVersion>
      <Sizes>
        <Size>
          <p>
            {feet}'{inches}" ({pokemon.height / 10} m)
          </p>
          <p>Height</p>
        </Size>
        <Size>
          <p>
            {weightLb} lb ({weightKg} kg)
          </p>
          <p>Weight</p>
        </Size>
      </Sizes>
    </Wrapper>
  )
}

export default SpeciesSection
