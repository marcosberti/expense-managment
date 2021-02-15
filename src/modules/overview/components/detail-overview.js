/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Small} from 'common-components'
import * as mq from 'media-queries'
import {secondary} from 'colors'
import {ChartWrapper, Chart} from './chart-wrapper'
import {YearBalanceChart} from './year-balance-chart'
import {PaymentsChart} from './payments-chart'

const ChartColor = ({text, color}) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `}
  >
    <div
      css={css`
        width: 30px;
        height: 30px;
        background-color: ${color};
        border-radius: var(--border-radius);
      `}
    />
    <Small>{text}</Small>
  </div>
)

ChartColor.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

const ChartColors = () => (
  <div
    css={css`
      padding: 1rem;
      display: flex;
      gap: 1rem;
    `}
  >
    <ChartColor text="Ingresos" color={secondary[500]} />
    <ChartColor text="Gastos" color={secondary[300]} />
  </div>
)

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
    <ChartColors />
    <ChartWrapper wrapperId="chart-wrapper">
      {/* <Chart>
        <YearBalanceChart />
      </Chart> */}
      <Chart>
        <PaymentsChart />
      </Chart>
    </ChartWrapper>
  </div>
)

export {DetailOverview}
