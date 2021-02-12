/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as mq from 'media-queries'
import {MainOverview} from './main-overview'
import {DetailOverview} from './detail-overview'
import {Categories} from './categories'

// TODO: conectar y recuperar de db
const income = 80000
const spent = 65000

const Charts = () => (
  <div
    css={css`
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);
      display: flex;
      flex-direction: column;

      ${mq.large} {
        flex-direction: row;
      }
    `}
  >
    <DetailOverview income={income} spent={spent} />
    <MainOverview income={income} spent={spent} />
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
