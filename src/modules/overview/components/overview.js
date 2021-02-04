/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Categories} from './categories'
import * as mq from '../../../styles/media-queries'

const Overview = () => (
  <div
    css={css`
      padding: 1rem;

      ${mq.large} {
        display: grid;
        grid-template-rows: 1fr 16rem;
      }
    `}
  >
    <div
      css={css`
        border-radius: var(--border-radius);
        background-color: var(--background-color-light);
      `}
    >
      {' '}
    </div>
    <Categories />
  </div>
)

export {Overview}
