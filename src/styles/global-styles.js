/** @jsxImportSource @emotion/react */
import {Global as EmotionGlobal, css} from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

const GlobalStyles = () => (
  <EmotionGlobal
    styles={css`
      ${emotionNormalize}
      html {
        font-family: 'Poppins', sans-serif;
        color: #333;
      }
      * {
        box-sizing: border-box;
        scroll-behavior: smooth;
      }
      body {
        background-color: #eee;
        height: 100vh;
        width: 100vw;

        & > #root {
          width: 100%;
          height: 100%;
        }
      }
      ul,
      button {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style: none;
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
)

export {GlobalStyles}
