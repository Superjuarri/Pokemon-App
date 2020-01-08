import { useState, useEffect } from 'react'
import chroma from 'chroma-js'
import analyze from 'rgbaster'

const ignoreColors = [
  'rgb(255, 255, 255)',
  'rgb(0, 0, 0)'
  // 'rgb(230,148,32)',
  // 'rgb(164, 98, 90)'
]

const getColorPalette = imgUrl => {
  const [colorPalette, setColorPalette] = useState([
    {
      color: 'rgb(255,255,255)',
      count: 222
    },
    {
      color: 'rgb(255,255,255)',
      count: 100
    },
    {
      color: 'rgb(255,255,255)',
      count: 91
    },
    {
      color: 'rgb(255,255,255)',
      count: 81
    },
    {
      color: 'rgb(255,255,255)',
      count: 77
    },
    {
      color: 'rgb(255,255,255)',
      count: 76
    },
    {
      color: 'rgb(255,255,255)',
      count: 39
    },
    {
      color: 'rgb(255,255,255)',
      count: 39
    },
    {
      color: 'rgb(255,255,255)',
      count: 34
    },
    {
      color: 'rgb(255,255,255)',
      count: 23
    },
    {
      color: 'rgb(255,255,255)',
      count: 22
    },
    {
      color: 'rgb(255,255,255)',
      count: 17
    },
    {
      color: 'rgb(255,255,255)',
      count: 10
    },
    {
      color: 'rgb(255,255,255)',
      count: 8
    },
    {
      color: 'rgb(255,255,255)',
      count: 7
    }
  ])

  useEffect(() => {
    const analyzeColorPalette = async imageUrl => {
      const result = await analyze(imageUrl, {
        scale: 0.35,
        ignore: ignoreColors
      })

      const calibratedResult = result
        .filter(palette => !palette.color.includes('rgba'))
        .map(palette => ({
          color: chroma(palette.color)
            .set('hsl.l', '.75')
            .saturate(1.75)
            .css(),
          count: palette.count
        }))

      setColorPalette(calibratedResult)
    }

    analyzeColorPalette(imgUrl)
  }, [imgUrl])

  return { colorPalette }
}

export default getColorPalette
