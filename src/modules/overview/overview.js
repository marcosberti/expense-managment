/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as mq from 'media-queries'
import {MainOverview} from './components/main-overview'
import {DetailOverview} from './components/detail-overview'
import {Categories} from './components/categories'

const Charts = () => (
  <div
    css={css`
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);

      ${mq.large} {
        display: flex;
        flex-direction: row;
      }
    `}
  >
    <DetailOverview />
    <MainOverview />
  </div>
)

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
    <Charts />
    <Categories />
  </div>
)

export {Overview}
