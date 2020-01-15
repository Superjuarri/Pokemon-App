import React, { forwardRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import getTypeColor from '../lib/getTypeColor'
import convertPokemonId from '../lib/convertPokemonId'

const CellWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`

const Cell = styled.div.attrs(props => ({
  color: props.color || '#eee'
}))`
  display: grid;
  width: 100%;
  height: 100%;

  padding: 20px;

  background: ${props => props.color};

  cursor: pointer;
`

const MoveTitle = styled.p`
  text-transform: capitalize;
  color: white;
`

const moveCellVariants = {
  initial: { scale: 0.96, y: 30, opacity: 0 },
  enter: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
  },
  exit: {
    scale: 0.6,
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
  }
}

const MoveCell = forwardRef(({ move }, ref) => {
  const color = getTypeColor(move.type.name)

  return (
    <CellWrapper variants={moveCellVariants}>
      <Link href='/move/[id]' as={`/move/${move.name}`}>
        <Cell ref={ref} color={color}>
          <MoveTitle>
            <span>{move.name}</span>
          </MoveTitle>
        </Cell>
      </Link>
    </CellWrapper>
  )
})

const List = styled.div`
  margin: 50px auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: grid;
  gap: 20px;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const PokemonGrid = ({ moves, lastPokemonElementRef }) => {
  return (
    <List variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
      {moves.map((move, index) => {
        if (moves.length === index + 1) {
          return (
            <MoveCell key={index} ref={lastPokemonElementRef} move={move} />
          )
        } else {
          return <MoveCell key={index} move={move} />
        }
      })}
    </List>
  )
}

export default PokemonGrid
