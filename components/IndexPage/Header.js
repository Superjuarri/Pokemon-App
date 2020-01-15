import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
  padding: 0;

  width: 100vw;
  height: 70vh;

  display: grid;

  background-color: #fc2846;
`

const Content = styled.header`
  margin: 0;
  /* padding: 2.5em; */

  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};
  height: 100%;

  justify-self: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  text-align: center;
  color: #fff;
`

const SubTitle = styled.p`
  width: 75%;
  min-width: 275px;
  max-width: 550px;

  color: #fff;
  text-align: center;
`

const ButtonLink = styled.a`
  margin-top: 25px;
  padding: 1em 2em;
  background-color: #fff;
  border-radius: 0.5em;

  cursor: pointer;
`

const Header = () => {
  return (
    <Wrapper>
      <Content>
        <Title>Hundreds of Pokémon to explore!</Title>
        <SubTitle>
          Research each Pokémon's types, abilities, and moves. Learn facts about
          your favorite pocket monsters that you had never known before.
        </SubTitle>
        <Link href='/pokedex'>
          <ButtonLink>Pokédex</ButtonLink>
        </Link>
      </Content>
    </Wrapper>
  )
}

export default Header
