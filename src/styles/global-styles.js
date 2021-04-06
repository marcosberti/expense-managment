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
        /* background */
        --background-color-light: #fff;
        --background-color: var(--neutral-200);

        /* text */
        --text-color: var(--neutral-600);
        --text-color-light: var(--neutral-400);
        --text-color-error: #dc0c0c;

        /* primary colors */
        --primary-300: ${primary[300]};
        --primary-400: ${primary[400]};
        --primary-400-op: ${primary[400]}54;
        --primary-600: ${primary[600]};

        /* secondaty colors */
        --secondary-100-op: ${secondary[100]}34;
        --secondary-300: ${secondary[300]};
        --secondary-400: ${secondary[400]};
        --secondary-400-op: ${secondary[400]}54;
        --secondary-500: ${secondary[500]};

        /* neutral colors */
        --neutral-200: ${neutral[200]};
        --neutral-300: ${neutral[300]};
        --neutral-400: ${neutral[400]};
        --neutral-500: ${neutral[500]};
        --neutral-600: ${neutral[600]};

        /* font */
        --font-size-sm: 0.7rem;
        --font-size-lg: 1rem;
        --font-size-xl: 1.75rem;

        /* != box sizes */
        --border-radius: 10px;
        --scroll-size: 8px;
        --header-size: 6rem;

        font-family: 'Poppins', sans-serif;
        color: var(--text-color);
        box-sizing: border-box;
      }

      * {
        &::-webkit-scrollbar {
          width: var(--scroll-size);
          height: var(--scroll-size);
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
