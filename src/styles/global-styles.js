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
      body {
        overflow: hidden;
        background-color: #eee;
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
