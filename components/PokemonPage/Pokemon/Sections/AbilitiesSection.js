import React, { useContext } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'

import { PokemonContext } from '../../../contexts/PokemonContext'

const Wrapper = styled.section`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  background: white;
  padding: 25px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};

  /* animation: slide-in-up 0.5s ease-in-out 0s; */
`

const SectionTitle = styled.h3`
  margin-bottom: 35px;
  text-align: center;
`

const Abilities = styled.div`
  display: flex;
  flex-direction: column-reverse;

  gap: 25px;
`

const Ability = styled.div`
  overflow: hidden;

  position: relative;
  padding: 10px;
  border-radius: 6px;

  display: flex;

  border: 2px solid ${({ color }) => chroma(color)};

  text-transform: capitalize;
  background-color: ${({ isHidden, color }) =>
    isHidden
      ? chroma(color)
          .desaturate(0.5)
          .brighten(0.5)
      : chroma(color)};
`
const AbilityText = styled.span`
  width: 100%;
  text-align: center;
  mix-blend-mode: color-dodge;
`

const Hidden = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-width: 125px;

  position: absolute;
  background: ${({ color }) => chroma(color)};

  left: 0;
  top: 0;
`

const AbilitiesSection = () => {
  const { pokemon, colorPalette } = useContext(PokemonContext)

  return (
    <Wrapper>
      <SectionTitle>Abilities</SectionTitle>
      <Abilities>
        {pokemon.abilities.map((ability, index) => (
          <Ability
            key={index}
            isHidden={ability.is_hidden}
            color={colorPalette[0].color}
          >
            {ability.is_hidden && (
              <Hidden color={colorPalette[0].color}>Hidden</Hidden>
            )}
            <AbilityText>{ability.ability.name}</AbilityText>
          </Ability>
        ))}
      </Abilities>
    </Wrapper>
  )
}

export default AbilitiesSection
