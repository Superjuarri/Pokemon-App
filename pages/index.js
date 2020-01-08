import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

import fetchAllPokemon from '../components/hooks/fetchAllPokemon'

import Layout from '../components/Layout/Layout'

import PokemonGrid from '../components/PokemonGrid'

const Wrapper = styled.div`
  background-color: #ffffff;
  /* background-image: url('https://www.transparenttextures.com/patterns/worn-dots.png'); */
`

const IndexPage = () => {
  const [fetchQuery, setFetchQuery] = useState(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit='
  )
  const [queryLimit, setQueryLimit] = useState(20)

  const { pokemon, nextUrl, loading, error } = fetchAllPokemon(
    fetchQuery,
    queryLimit
  )

  const observer = useRef()
  const lastPokemonElementRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && nextUrl) {
          setFetchQuery(nextUrl)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, nextUrl]
  )

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <Layout>
      <Wrapper>
        <PokemonGrid
          allPokemon={pokemon}
          lastPokemonElementRef={lastPokemonElementRef}
        />
        <p>{error ? 'error' : loading && 'Loading...'}</p>
      </Wrapper>
    </Layout>
  )
}
export default IndexPage
