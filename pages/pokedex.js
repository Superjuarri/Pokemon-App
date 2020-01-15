import React, { useState, useEffect, useRef, useCallback } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ReactSearchBox from 'react-search-box'

import fetchAllData from '../components/hooks/fetchAllData'
import fetchPaginatedData from '../components/hooks/fetchPaginatedData'

import Layout from '../components/Layout/Layout'

import PokemonGrid from '../components/PokemonGrid'

const pageVarients = {
  enter: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  },
  exit: {
    x: '100vw',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.48, 0.15, 0.25, 0.96],
      staggerChildren: 0.1
    }
  }
}

const SearchBoxWrapper = styled.div`
  position: sticky;
  top: 0;

  margin: 50px auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};
`

const Wrapper = styled(motion.div)`
  background-color: #ffffff;
  /* background-image: url('https://www.transparenttextures.com/patterns/worn-dots.png'); */
`

const PokedexPage = () => {
  const [fetchQuery, setFetchQuery] = useState(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit='
  )
  const [queryLimit, setQueryLimit] = useState(20)
  const { data: pokemon, nextUrl, loading, error } = fetchPaginatedData(
    fetchQuery,
    queryLimit
  )

  const { allData: allPokemon } = fetchAllData(
    'https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit='
  )
  const allPokemonNames = allPokemon.map((pokemon, index) => ({
    key: index,
    value: pokemon.name
  }))

  const [searchValue, setSearchValue] = useState('')

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
      <Wrapper
        key='IndexWrapper'
        initial='exit'
        animate='enter'
        exit='exit'
        variants={pageVarients}
      >
        <SearchBoxWrapper>
          <ReactSearchBox
            placeholder='Search for pokémon :)'
            data={allPokemonNames}
            onSelect={record =>
              Router.push(`/pokemon/[id]`, `/pokemon/${record.value}`)
            }
            onChange={value => setSearchValue(value)}
            fuseConfigs={{
              threshold: 0.05
            }}
            value={searchValue}
          />
        </SearchBoxWrapper>
        <PokemonGrid
          allPokemon={pokemon}
          lastPokemonElementRef={lastPokemonElementRef}
        />
        <p>{error ? 'error' : loading && 'Loading...'}</p>
      </Wrapper>
    </Layout>
  )
}
export default PokedexPage
