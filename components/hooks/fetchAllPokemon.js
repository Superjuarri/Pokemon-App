import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

const fetchAllPokemon = (query, limit) => {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nextUrl, setNextUrl] = useState(query + limit)

  useEffect(() => {
    const abortController = new AbortController()
    const promiseAbortController = new AbortController()

    const fetchPokemon = async () => {
      setLoading(true)

      const fetchPokemonData = await fetch(nextUrl, {
        signal: abortController.signal
      }).then(res => res.json())

      const pokemonUrls = await fetchPokemonData.results.map(pokemon =>
        fetch(pokemon.url, {
          signal: promiseAbortController.signal
        }).then(res => res.json())
      )

      Promise.all(pokemonUrls)
        .then(res => {
          const currentPokemon = res.map(result => result)

          setPokemon(prevPokemon => [...prevPokemon, ...currentPokemon])
          setNextUrl(fetchPokemonData.next)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setError(err)
        })
    }
    fetchPokemon()

    return () => {
      abortController.abort()
      promiseAbortController.abort()
    }
  }, [query])

  return {
    pokemon,
    nextUrl,
    loading,
    error
  }
}

export default fetchAllPokemon
