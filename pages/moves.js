import React, { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ReactSearchBox from 'react-search-box'

import fetchAllData from '../components/hooks/fetchAllData'
import fetchPaginatedData from '../components/hooks/fetchPaginatedData'

import Layout from '../components/Layout/Layout'

import MovesList from '../components/MovesList'

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

const MovesPage = () => {
  const [fetchQuery, setFetchQuery] = useState(
    'https://pokeapi.co/api/v2/move/?offset=0&limit='
  )
  const [queryLimit, setQueryLimit] = useState(40)
  const { data: moves, nextUrl, loading, error } = fetchPaginatedData(
    fetchQuery,
    queryLimit
  )

  const { allData: allMoves } = fetchAllData(
    'https://pokeapi.co/api/v2/move/?offset=0&limit='
  )
  const allMovesNames = allMoves.map((move, index) => ({
    key: index,
    value: move.name
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
    <>
      <Head>
        <title>Moves</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
      </Head>
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
              placeholder='Search for moves :)'
              data={allMovesNames}
              onSelect={record =>
                Router.push(`/move/[id]`, `/move/${record.value}`)
              }
              onChange={value => setSearchValue(value)}
              fuseConfigs={{
                threshold: 0.05
              }}
              value={searchValue}
            />
          </SearchBoxWrapper>
          <MovesList
            moves={moves}
            lastPokemonElementRef={lastPokemonElementRef}
          />
          <p>{error ? 'error' : loading && 'Loading...'}</p>
        </Wrapper>
      </Layout>
    </>
  )
}
export default MovesPage
