import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Arrow = styled.button`
  cursor: pointer;
`

const Arrows = ({ id }) => {
  const prevId = id - 1
  const nextId = id + 1

  return (
    <Wrapper>
      <Link href={`/pokemon/${prevId}/`}>
        <Arrow>{prevId}</Arrow>
      </Link>
      <Link href={`/pokemon/${nextId}/`}>
        <Arrow>{nextId}</Arrow>
      </Link>
    </Wrapper>
  )
}

export default Arrows
