/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as mq from 'media-queries'
import {ChartWrapper, Chart} from './chart-wrapper'
import {YearBalanceChart} from './year-balance-chart'
import {PaymentsChart} from './payments-chart'

const DetailOverview = () => (
  <div
    css={css`
      display: none;

      ${mq.large} {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        width: 20rem;
      }
    `}
  >
    <ChartWrapper wrapperId="chart-wrapper">
      <Chart id="detalle-anual">
        <YearBalanceChart />
      </Chart>
      <Chart id="detalle-cuotas">
        <PaymentsChart />
      </Chart>
    </ChartWrapper>
  </div>
)

export {DetailOverview}
