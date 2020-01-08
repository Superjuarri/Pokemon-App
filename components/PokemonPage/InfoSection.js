import React, { useContext } from 'react'
import styled from 'styled-components'

import { PokemonContext } from '../contexts/PokemonContext'

import getTypeColor from '../../lib/getTypeColor'

const Wrapper = styled.section`
  margin: 0 auto;
  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  background: white;
  padding: 25px;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  grid-template-areas:
    'InfoSectionTop PokemonInfoImage'
    'InfoSectionMiddle PokemonInfoImage'
    'InfoSectionBottom PokemonInfoImage';
`

const InfoSectionTop = styled.div`
  display: flex;
  flex-direction: row;

  align-items: baseline;
  justify-content: space-between;
  grid-area: InfoSectionTop;
`

const Name = styled.h3`
  text-transform: capitalize;
`

const InfoSectionMiddle = styled.div`
  grid-area: InfoSectionMiddle;
`

const InfoSectionBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  grid-area: InfoSectionBottom;
`

const PokemonInfoImage = styled.img`
  filter: ${({ color }) => `drop-shadow(2px 5px 6px ${color})`};

  grid-area: PokemonInfoImage;
  align-self: center;
  justify-self: center;
`

const PokemonType = styled.p`
  /* width: 50px; */
  margin: 0;
  padding: 0;
  color: #ffffff;
  padding: 0.25rem 1.5rem;
  border-radius: 15px;
  text-transform: capitalize;
  background-color: ${({ type }) => type};
`

const InfoSection = () => {
  const { pokemon, species, colorPalette } = useContext(PokemonContext)

  return (
    <Wrapper>
      <InfoSectionTop>
        <Name>{pokemon.name}</Name>
        <p>#{pokemon.id}</p>
      </InfoSectionTop>
      <InfoSectionMiddle>
        <p>{species.genera[2].genus}</p>
      </InfoSectionMiddle>
      <InfoSectionBottom>
        {pokemon.types.map((type, index) => (
          <PokemonType key={index} type={getTypeColor(type.type.name)}>
            {type.type.name}
          </PokemonType>
        ))}
      </InfoSectionBottom>

      <PokemonInfoImage
        src={pokemon.sprites.front_default}
        color={colorPalette[0].color}
      />
    </Wrapper>
  )
}

export default InfoSection
