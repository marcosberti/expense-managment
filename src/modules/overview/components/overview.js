/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {DonutChart} from './donut-chart'
import {Categories} from './categories'
import * as mq from '../../../styles/media-queries'
import {primary} from '../../../styles/colors'

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

        ${mq.large} {
          display: grid;
          grid-template-columns: 1fr auto;

          & > div:first-of-type {
            border-right: 4px solid ${primary[300]};
          }
        }
      `}
    >
      <div> </div>
      <DonutChart income={124800} spent={100000} />
    </div>
    <Categories />
  </div>
)

export {Overview}
