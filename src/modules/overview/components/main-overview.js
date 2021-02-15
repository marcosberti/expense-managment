/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {AbsoluteBox, Small, Big, Bigger, TextCenter} from 'common-components'
import {formatAmount} from 'common-utils'
import * as mq from 'media-queries'
import {ChartWrapper} from './chart-wrapper'
import {DonutChart} from './donut-chart'

const MainOverview = ({income, spent}) => (
  <div
    css={css`
      height: 100%;
      min-height: 18rem;
      min-width: 18rem;
      display: flex;
      flex-direction: column;
      position: relative;

      ${mq.large} {
        padding: 1rem 1rem 2.5rem 1rem;
        border-left: 4px dashed var(--background-color);
      }
    `}
  >
    <TextCenter>
      <Small>Ingresos</Small>
      <Big>{formatAmount(income)}</Big>
    </TextCenter>
    <AbsoluteBox position={{mobile: {top: '6.5rem'}, desktop: {top: '11rem'}}}>
      <Small>Gastos</Small>
      <Big>{formatAmount(spent)}</Big>
    </AbsoluteBox>
    <ChartWrapper
      wrapperId="donutchart-wrapper"
      css={css`
        min-height: 12rem;
        min-width: 12rem;
      `}
    >
      <DonutChart income={income} spent={spent} />
    </ChartWrapper>
    <TextCenter>
      <Small>Disponible</Small>
      <Bigger>{formatAmount(income - spent)}</Bigger>
    </TextCenter>
  </div>
)

MainOverview.propTypes = {
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {MainOverview}
