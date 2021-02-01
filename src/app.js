import {Global, css} from '@emotion/react'
import emotionNormalize from 'emotion-normalize'
import {Overview} from './pages/overview'

const App = () => (
  <>
    <Global
      styles={css`
        ${emotionNormalize}
        html {
          font-family: 'Poppins', sans-serif;
        }
        body {
          overflow: hidden;
        }
        ul,
        button {
          margin: 0;
          padding: 0;
        }
        button {
          cursor: pointer;
          border: none;
        }
        svg {
          vertical-align: middle;
        }
      `}
    />
    <Overview />
  </>
)

export {App}
