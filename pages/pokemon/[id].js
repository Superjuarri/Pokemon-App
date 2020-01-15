import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

import { PokemonContext } from '../../components/contexts/PokemonContext'

import getColorPalette from '../../lib/getColorPalette'

import Layout from '../../components/Layout/Layout'
import NoPokemon from '../../components/PokemonPage/NoPokemon/NoPokemon'
import PokemonSections from '../../components/PokemonPage/Pokemon/PokemonSections'

const PokemonPage = ({
  pokemon,
  pokemonSpecies,
  pokemonEvolutions,
  prevPokemon,
  nextPokemon
}) => {
  const { colorPalette } = pokemon
    ? getColorPalette(pokemon.sprites.front_default)
    : []

  return (
    <>
      <Head>
        <title>Pokémon Page</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
      </Head>
      <Layout>
        {pokemon ? (
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
            <PokemonSections />
          </PokemonContext.Provider>
        ) : (
          <NoPokemon />
        )}
      </Layout>
    </>
  )
}

PokemonPage.getInitialProps = async context => {
  const { id } = context.query

  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  const prevId = pokemon && parseInt(pokemon.id) - 1
  const nextId = pokemon && parseInt(pokemon.id) + 1

  const prevPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevId}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  const nextPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  const pokemonSpecies = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  )
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  let pokemonEvolutions = []

  if (pokemon) {
    const evolutionChain = await fetch(pokemonSpecies.evolution_chain.url)
      .then(res => res.json())
      .catch(err => {
        if (err) return null
      })

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
  }

  return {
    pokemon,
    pokemonSpecies,
    prevPokemon,
    nextPokemon,
    pokemonEvolutions
  }
}

export default PokemonPage
