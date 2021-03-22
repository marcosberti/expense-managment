/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {ChartWrapper, Chart} from './chart-wrapper'
import {YearBalanceChart} from './year-balance-chart'
import {PaymentsChart} from './payments-chart'

const DetailOverview = ({yearData, cuotas}) => (
  <div
    css={css`
      display: none;

      ${mq.large} {
        flex-grow: 1;
        width: 20rem;
        display: flex;
        flex-direction: column;
      }
    `}
  >
    <ChartWrapper wrapperId="chart-wrapper">
      <Chart id="detalle-anual">
        <YearBalanceChart yearData={yearData} />
      </Chart>
      <Chart id="detalle-cuotas">
        <PaymentsChart paymentsData={cuotas} />
      </Chart>
    </ChartWrapper>
  </div>
)

DetailOverview.propTypes = {
  yearData: PropTypes.array.isRequired,
  cuotas: PropTypes.array.isRequired,
}

export {DetailOverview}
