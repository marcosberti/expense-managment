/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as mq from 'media-queries'
import {useDimentions} from 'hooks'
import {MainOverview} from './main-overview'
import {DetailOverview} from './detail-overview'
import {Categories} from './categories'

// TODO: conectar y recuperar de db
const income = 0
const spent = 0

const Charts = () => {
  const {isMobile} = useDimentions()

  return (
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
      {!isMobile ? <DetailOverview income={income} spent={spent} /> : null}
      <MainOverview income={income} spent={spent} />
    </div>
  )
}

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
