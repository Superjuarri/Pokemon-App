import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'
import chroma from 'chroma-js'

import { PokemonContext } from '../../components/contexts/PokemonContext'

import getColorPalette from '../../lib/getColorPalette'

import Layout from '../../components/Layout/Layout'

import Arrows from '../../components/PokemonPage/Arrows'
import InfoSection from '../../components/PokemonPage/InfoSection'
import SpeciesSection from '../../components/PokemonPage/SpeciesSection'
import AbilitiesSection from '../../components/PokemonPage/AbilitiesSection'
import StatsSection from '../../components/PokemonPage/StatsSection'
import EvolutionsSection from '../../components/PokemonPage/EvolutionsSection'

const PokemonPage = ({ pokemon, species, pokemonEvolutions }) => {
  const { colorPalette } = getColorPalette(pokemon.sprites.front_default)

  return (
    <Layout>
      <PokemonContext.Provider
        value={{ pokemon, species, pokemonEvolutions, colorPalette }}
      >
        {pokemon ? (
          <Wrapper color={colorPalette[0].color}>
            <Arrows id={pokemon.id} />
            <InfoSection />
            <SpeciesSection />
            <AbilitiesSection />
            <StatsSection />
            <EvolutionsSection />
          </Wrapper>
        ) : (
          <div>
            <p>Pokemon does not exist...</p>
          </div>
        )}
      </PokemonContext.Provider>
    </Layout>
  )
}

const Wrapper = styled.div`
  padding: 50px 0;
  display: grid;
  gap: 50px;

  background-color: ${({ color }) => chroma(color)};
`

PokemonPage.getInitialProps = async context => {
  const { id } = context.query

  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  const evolutionChain = await fetch(species.evolution_chain.url)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  let pokemonEvolutions = []
  let evoData = evolutionChain.chain

  do {
    let numberOfEvolutions = evoData['evolves_to'].length

    pokemonEvolutions.push({
      species_name: evoData.species.name,
      min_level: !evoData ? 1 : evoData.min_level,
      trigger_name: !evoData ? null : evoData.trigger,
      item: !evoData ? null : evoData.item
    })

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        pokemonEvolutions.push({
          species_name: evoData.evolves_to[i].species.name,
          min_level: !evoData.evolves_to[i]
            ? 1
            : evoData.evolves_to[i].min_level,
          trigger_name: !evoData.evolves_to[i]
            ? null
            : evoData.evolves_to[i].trigger,
          item: !evoData.evolves_to[i] ? null : evoData.evolves_to[i].item
        })
      }
    }

    evoData = evoData['evolves_to'][0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  return {
    pokemon,
    species,
    pokemonEvolutions
  }
}

export default PokemonPage
