/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as mq from 'media-queries'
import {useData} from 'context/data'
import {useDimentions} from 'hooks'
import {ChartWrapper, Chart} from './chart-wrapper'
import {YearBalanceChart} from './year-balance-chart'
import {PaymentsChart} from './payments-chart'
import {getYearlyData} from '../utils/utils'

const DetailOverview = () => {
  const data = useData()
  const yearData = getYearlyData(data)
  const {isMobile} = useDimentions()

  console.log('data', data)

  if (isMobile) {
    return null
  }

  return (
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
          <YearBalanceChart yearData={yearData} />
        </Chart>
        <Chart id="detalle-cuotas">
          <PaymentsChart paymentsData={data.cuotas} />
        </Chart>
      </ChartWrapper>
    </div>
  )
}

export {DetailOverview}
