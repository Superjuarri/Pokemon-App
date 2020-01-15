import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

const fetchPaginatedData = (query, limit) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nextUrl, setNextUrl] = useState(query + limit)

  useEffect(() => {
    const abortController = new AbortController()
    const promiseAbortController = new AbortController()

    const fetchPaginatedData = async () => {
      setLoading(true)

      const fetchData = await fetch(nextUrl, {
        signal: abortController.signal
      }).then(res => res.json())

      const dataUrls = await fetchData.results.map(entry =>
        fetch(entry.url, {
          signal: promiseAbortController.signal
        }).then(res => res.json())
      )

      Promise.all(dataUrls)
        .then(res => {
          const currentData = res.map(result => result)

          setData(prevData => [...prevData, ...currentData])
          setNextUrl(fetchData.next != null && fetchData.next)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setError(err)
        })
    }
    fetchPaginatedData()

    return () => {
      abortController.abort()
      promiseAbortController.abort()
    }
  }, [query])

  return {
    data,
    nextUrl,
    loading,
    error
  }
}

export default fetchPaginatedData
