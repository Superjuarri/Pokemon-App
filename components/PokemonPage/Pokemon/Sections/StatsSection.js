import React, { useContext } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'

import { PokemonContext } from '../../../contexts/PokemonContext'

const Wrapper = styled.section`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  min-width: 260px;
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  background: white;
  padding: 25px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};
`

const SectionTitle = styled.h3`
  margin-bottom: 35px;
  text-align: center;
`

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const StatWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 10px;
`

const StatName = styled.span`
  text-align: center;
  text-transform: capitalize;
  /* color: white; */
  background-color: ${({ color }) => color};
  border-radius: 5px 0 0 5px;
  padding: 10px;
  white-space: nowrap;

  min-width: 125px;
`

const Stat = styled.div`
  /* min-width: 80px; */
  width: ${({ stat }) => stat - 35}%;

  text-align: right;
  /* color: white; */
  background-color: ${({ color }) =>
    chroma(color)
      .desaturate(0.5)
      .brighten(0.75)};

  border-radius: 0 5px 5px 0;
  padding: 10px;
  align-self: center;

  > span {
    margin-right: 10px;
  }
`

const StatsSection = () => {
  const { pokemon, colorPalette } = useContext(PokemonContext)

  // const biggestStat = pokemon.stats
  //   .map(stat => stat.base_stat)
  //   .reduce((a, b) => Math.max(a, b))

  return (
    <Wrapper>
      <SectionTitle>Stats</SectionTitle>
      <StatsWrapper>
        {pokemon.stats.map((stat, index) => (
          <StatWrapper key={index}>
            <StatName color={colorPalette[0].color}>
              {stat.stat.name === 'special-attack'
                ? 'Sp. Attack'
                : stat.stat.name === 'special-defense'
                ? 'Sp. Defence'
                : stat.stat.name}
            </StatName>
            <Stat
              stat={pokemon.stats[index].base_stat}
              color={colorPalette[0].color}
            >
              <span>{pokemon.stats[index].base_stat}</span>
            </Stat>
          </StatWrapper>
        ))}
      </StatsWrapper>
    </Wrapper>
  )
}

export default StatsSection
