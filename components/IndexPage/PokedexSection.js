import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
  padding: 0;

  width: 100vw;

  display: grid;

  background-color: #fff;
`

const Content = styled.section`
  margin: 0;
  padding: 6em 0;

  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  justify-self: center;

  display: grid;
  grid-gap: 10%;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
  }
`

const Left = styled.div`
  display: grid;
  align-content: center;
`

const Right = styled.div`
  padding: 10%;
  display: grid;
  justify-items: center;
  align-items: center;
`

const Title = styled.h1``

const Text = styled.p`
  font-size: 0.9em;
  line-height: 1.6;
`

const ButtonLink = styled.a`
  display: inline-block;
  margin-top: 15px;

  padding: 0.5em 1em;
  color: #fff;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #fc2846;
  border-radius: 0.5em;

  cursor: pointer;
`

const Img = styled.img`
  width: 75%;
  height: auto;

  @media screen and (max-width: 600px) {
    width: 50%;
  }
`

const PokedexSection = () => {
  return (
    <Wrapper>
      <Content>
        <Left>
          <div>
            <Title>Detailed entries on Pokémon</Title>
            <Text>
              Know the types, abilities, and moves of each pokemon. As well as
              height, weight, and other details. This is a great way to get
              familiar with your Pokémon.
            </Text>
            <Link href='/pokedex'>
              <ButtonLink>Pokédex</ButtonLink>
            </Link>
          </div>
        </Left>
        <Right>
          <Img
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.bulbagarden.net%2Fupload%2F6%2F60%2F258Mudkip.png&f=1&nofb=1'
            alt='Mudkip'
          />
        </Right>
      </Content>
    </Wrapper>
  )
}

export default PokedexSection
