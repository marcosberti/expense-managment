/** @jsxImportSource @emotion/react */
import {Global as EmotionGlobal, css} from '@emotion/react'
import emotionNormalize from 'emotion-normalize'
import {primary, secondary, neutral} from 'colors'
import * as mq from 'media-queries'

const GlobalStyles = () => (
  <EmotionGlobal
    styles={css`
      ${emotionNormalize}

      html {
        --background-color-light: #fff;
        --background-color: ${neutral[200]};
        --text-color: ${neutral[600]};
        --text-color-light: ${neutral[400]};
        --primary-400: ${primary[400]};
        --secondary-400: ${secondary[400]};
        --font-size-sm: 0.7rem;
        --font-size-lg: 1rem;
        --font-size-xl: 1.75rem;
        --border-radius: 10px;

        font-family: 'Poppins', sans-serif;
        color: var(--text-color);
        box-sizing: border-box;
      }

      * {
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background: ${neutral[300]};
        }
        &::-webkit-scrollbar-thumb {
          background: ${primary[400]};
        }
      }

      *,
      *:after,
      *:before {
        box-sizing: inherit;
        scroll-behavior: smooth;
      }

      body {
        background-color: var(--background-color);
        height: 100vh;
        width: 100vw;
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

      h1 {
        margin-bottom: 0.5rem;
      }

      ${mq.large} {
        html {
          --font-size-sm: 0.75rem;
          --font-size-lg: 1.5rem;
          --font-size-xl: 2.5rem;
        }
      }
    `}
  />
)

export {GlobalStyles}
