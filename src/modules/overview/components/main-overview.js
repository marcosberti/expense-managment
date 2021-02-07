/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {DonutChart} from './donut-chart'
import {AbsoluteBox, Small, Big, Bigger} from '../../common/components'
import {formatAmount} from '../../common/utils/utils'
import {secondary} from '../../../styles/colors'
import * as mq from '../../../styles/media-queries'

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
