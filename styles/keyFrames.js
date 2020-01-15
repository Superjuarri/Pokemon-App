import { keyframes } from 'styled-components'

export const keyFrameExampleOne = keyframes`
  0% {
    height: 200px;
  }
  100% {
    height: 600px;
    background: orange;
  }
`

export const opacity = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `

export const bgColorBuilder = color => {
  const bgColor = keyframes`
    0% {
      background-color: #fff;
    }
    100% {
      background-color: ${color};
    }
  `
  return bgColor
}

export const slideInLeft = keyframes`
    0% {
      transform: translate(100vw, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  `

export const slideInRight = keyframes`
    0% {
      transform: translate(-100vw, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  `

export const slideInDown = keyframes`
    0% {
      transform: translate(0, -100vh);
    }
    100% {
      transform: translate(0, 0);
    }
  `

export const slideInUp = keyframes`
    0% {
      transform: translate(0, 100vh);
    }
    100% {
      transform: translate(0, 0);
    }
  `
