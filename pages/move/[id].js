import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

import { MoveContext } from '../../components/contexts/MoveContext'

import Layout from '../../components/Layout/Layout'

const PokemonPage = ({ move }) => {
  return (
    <Layout>
      {move ? (
        <MoveContext.Provider
          value={{
            move
          }}
        >
          <p>{move.name}</p>
          <p>{move.description}</p>
        </MoveContext.Provider>
      ) : (
        <p>No moves ;-;</p>
      )}
    </Layout>
  )
}

PokemonPage.getInitialProps = async context => {
  const { id } = context.query

  const move = await fetch(`https://pokeapi.co/api/v2/move/${id}`)
    .then(res => res.json())
    .catch(err => {
      if (err) return null
    })

  return {
    move
  }
}

export default PokemonPage
