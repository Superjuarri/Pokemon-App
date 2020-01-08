import Link from 'next/link'
import styled from 'styled-components'

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

const Nav = styled.nav``

const Navbar = () => {
  return (
    <Wrapper>
      <Content>
        <Link href={`/`}>
          <h1>Pokémon Data</h1>
        </Link>

        <Nav>
          <Link href='/about'>
            <a title='About Page'>About Page</a>
          </Link>
        </Nav>
      </Content>
    </Wrapper>
  )
}

export default Navbar
