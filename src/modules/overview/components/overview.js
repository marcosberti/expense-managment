/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {MainOverview} from './main-overview'
import {DetailOverview} from './detail-overview'
import {Categories} from './categories'
import * as mq from '../../../styles/media-queries'

// TODO: conectar y recuperar de db
const income = 80000
const spent = 65000

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
        display: flex;
        flex-direction: column;

        ${mq.large} {
          flex-direction: row;
          /* grid-template-columns: 1fr auto; */
        }
      `}
    >
      <DetailOverview income={income} spent={spent} />
      <MainOverview income={income} spent={spent} />
    </div>
    <Categories />
  </div>
)

export {Overview}
