import React, { useState } from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import { slideInLeft } from '../../styles/keyFrames'

const mediaSize = '800px'

const Wrapper = styled.div`
  z-index: 900;
  flex-shrink: 0;

  position: sticky;
  top: 0;

  width: 100%;
  height: ${({ theme }) => theme.dimensions.navbarHeight};

  display: flex;
  justify-content: center;

  background-color: #ffffff;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
`

const Content = styled.div`
  position: relative;

  display: flex;

  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  align-items: center;
  justify-content: space-between;
`

const Logo = styled.h3`
  z-index: 902;
  position: relative;
  right: 0.75em;
  padding: 0.5em 0.75em;
  white-space: nowrap;
  cursor: pointer;

  font-family: 'Montserrat', sans-serif;
  font-weight: 400;

  > span {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: #ff4236;
  }
`

const Nav = styled.nav`
  @media screen and (max-width: ${mediaSize}) {
    all: unset;
    z-index: 901;
    display: ${({ navToggled }) => (navToggled ? `block` : `none`)};

    position: absolute;
    top: 0;
    left: -10vw;
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #fff;
    box-shadow: 0 0 3em rgba(0, 0, 0, 0.15);
    transform: ${({ navToggled }) =>
      navToggled ? `translateX(0%)` : `translateX(100%)`};

    ${({ navToggled }) =>
      navToggled &&
      css`
        animation: ${slideInLeft} 0.2s linear 0s 1;
      `}
  }
`

const NavList = styled.ul`
  position: relative;
  left: 0.75em;
  display: flex;
  flex-direction: row;
  list-style: none;

  @media screen and (max-width: ${mediaSize}) {
    all: unset;

    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em 6em;

    ${({ navToggled }) =>
      navToggled &&
      `
      
    `}
  }
`

const NavItem = styled.li`
  margin-left: 1em;
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: ${mediaSize}) {
    all: unset;

    margin-bottom: 3em;
    ${({ navToggled }) =>
      navToggled &&
      `
    
    `}
  }
`

const A = styled.a`
  padding: 0.5em 0.75em;

  font-size: 0.9em;
  font-weight: light;

  @media screen and (max-width: ${mediaSize}) {
    all: unset;

    padding: 0.5em 0.75em;
    text-decoration: none;
    color: red;
    cursor: pointer;

    :hover {
      color: #ccc;
    }

    ${({ navToggled }) =>
      navToggled &&
      `
      
    `}
  }
`

const HamburgerToggle = styled.button`
  position: relative;
  right: -0.5em;
  padding: 1em 0.5em;
  background-color: inherit;
  border: 0;

  cursor: pointer;

  @media screen and (min-width: ${mediaSize}) {
    display: none;
  }
`

const Hamburger = styled.span`
  z-index: 901;
  display: block;
  position: relative;

  width: 1.25em;
  height: 3px;
  background: #000;
  border-radius: 2px;

  transition: transform 350ms ease-in-out, opacity 200ms linear;

  ${({ navToggled }) =>
      navToggled &&
      `
    transform: rotate(45deg);
    `}
    ::before {
    bottom: 6px;

    ${({ navToggled }) =>
      navToggled &&
      `
   opacity: 0;
    `}
  }

  ::after {
    top: 6px;

    ${({ navToggled }) =>
      navToggled &&
      `
    transform: rotate(90deg) translate(-6px);
    `}
  }

  ::before,
  ::after {
    content: '';
    position: absolute;
    left: 0;

    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: inherit;

    transition: transform 350ms ease-in-out, opacity 200ms linear;
  }
`

const Navbar = () => {
  const [navToggled, setNavToggled] = useState(false)

  return (
    <Wrapper>
      <Content>
        <Link href={`/`}>
          <Logo>
            <span>Poké</span>Checkup
          </Logo>
        </Link>

        <Nav navToggled={navToggled}>
          <NavList navToggled={navToggled}>
            <NavItem>
              <Link href='/'>
                <A title='Home'>Home</A>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/pokedex'>
                <A title='Pokedex'>Pokedex</A>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/moves'>
                <A title='Moves'>Moves</A>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/about'>
                <A title='About Page'>About</A>
              </Link>
            </NavItem>
          </NavList>
        </Nav>
        <HamburgerToggle
          onClick={() => setNavToggled(!navToggled)}
          navToggled={navToggled}
        >
          <Hamburger navToggled={navToggled} />
        </HamburgerToggle>
      </Content>
    </Wrapper>
  )
}

export default Navbar
