/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {AbsoluteBox, Small, Big, Bigger} from 'common-components'
import {formatAmount} from 'common-utils'
import {secondary} from 'colors'
import * as mq from 'media-queries'
import {DonutChart} from './donut-chart'

const MainOverview = ({income, spent}) => (
  <div
    css={css`
      order: 1;
      height: 100%;
      position: relative;
      max-height: 20rem;

      ${mq.large} {
        order: 2;
        border-left: 4px solid ${secondary[100]};
        max-height: none;
      }
    `}
  >
    <AbsoluteBox position={{mobile: {top: '34%'}, desktop: {top: '30%'}}}>
      <Small>Gastaste</Small>
      <Big>{formatAmount(spent)}</Big>
    </AbsoluteBox>
    <DonutChart income={income} spent={spent} />
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
