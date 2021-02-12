/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {AbsoluteBox, Small, Big, Bigger} from 'common-components'
import {formatAmount} from 'common-utils'
import {secondary} from 'colors'
import * as mq from 'media-queries'
import {ChartWrapper} from './chart-wrapper'
import {DonutChart} from './donut-chart'

const MainOverview = ({income, spent}) => (
  <div
    css={css`
      height: 100%;
      position: relative;
      max-height: 20rem;
      min-width: 18rem;

      ${mq.large} {
        max-height: none;
        border-left: 4px solid ${secondary[100]};
      }
    `}
  >
    <AbsoluteBox position={{mobile: {top: '34%'}, desktop: {top: '30%'}}}>
      <Small>Gastaste</Small>
      <Big>{formatAmount(spent)}</Big>
    </AbsoluteBox>
    <ChartWrapper wrapperId="donutchart-wrapper">
      <DonutChart income={income} spent={spent} />
    </ChartWrapper>
    <AbsoluteBox
      position={{mobile: {bottom: '.5rem'}, desktop: {bottom: '1.5rem'}}}
    >
      <Small>Disponible</Small>
      <Bigger>{formatAmount(income - spent)}</Bigger>
    </AbsoluteBox>
  </div>
)

MainOverview.propTypes = {
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {MainOverview}
