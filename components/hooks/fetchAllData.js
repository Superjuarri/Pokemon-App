import { useEffect, useState } from 'react'

const fetchAllData = url => {
  const [allData, setAllData] = useState([])
  const [limit, setLimit] = useState(150)
  const [nextUrl, setNextUrl] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      const fetchDataLimit = await fetch(`${url}1`).then(res => res.json())

      setLimit(fetchDataLimit.count)

      const fetchData = await fetch(`${url + limit}`, {
        signal: abortController.signal
      }).then(res => res.json())

      const currentData = await fetchData.results.map(entry => ({
        name: entry.name,
        id: entry.url.slice(30, entry.length).match(/\d+/)[0]
      }))

      setAllData(prevData => [...prevData, ...currentData])

      fetchData.next != null && setNextUrl(currentData.next)
    }
    fetchData()

    return () => abortController.abort()
  }, [nextUrl])
  return {
    allData
  }
}

export default fetchAllData
