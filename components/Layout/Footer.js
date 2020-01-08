import styled from 'styled-components'

const Footer = styled.footer`
  z-index: 900;
  flex-shrink: 0;

  width: 100%;
  height: 70px;
  background: #ffffff;

  display: flex;
  align-content: center;
  overflow: hidden;
`

const Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  width: ${({ theme }) => theme.dimensions.contentWidth};
  max-width: ${({ theme }) => theme.dimensions.contentWidthMax};

  color: ${({ theme }) => theme.colors.fontLight};
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;

  border-top: 1px dashed ${({ theme }) => theme.colors.fontLight};
`

const Love = styled.p`
  span {
    color: #e31c3d;
  }
`

export default () => {
  return (
    <Footer>
      <Content>
        <Love>
          Made with <span>&#9829;</span> in Southern California
        </Love>
      </Content>
    </Footer>
  )
}
