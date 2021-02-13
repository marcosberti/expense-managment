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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      min-height: 18rem;
      /* max-height: 18rem;
      min-width: 18rem; */

      ${mq.large} {
        max-height: none;
        border-left: 4px solid ${secondary[100]};
      }
    `}
  >
    <AbsoluteBox position={{mobile: {top: '24%'}, desktop: {top: '30%'}}}>
      <Small>Gastaste</Small>
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
    {/* <AbsoluteBox
      position={{mobile: {bottom: '.5rem'}, desktop: {bottom: '1.5rem'}}}
    > */}
    <div
      css={css`
        text-align: center;
      `}
    >
      <Small>Disponible</Small>
      <Bigger>{formatAmount(income - spent)}</Bigger>
    </div>
    {/* </AbsoluteBox> */}
  </div>
)

MainOverview.propTypes = {
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {MainOverview}
