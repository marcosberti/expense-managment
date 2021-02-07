/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {DonutChart} from './donut-chart'
import {Small, Big, Bigger} from '../../common/components'
import {formatAmount} from '../../common/utils/utils'
import {secondary} from '../../../styles/colors'

// TODO: conectar y recuperar de db
const income = 124800
const spent = 54000

const AbsoluteBox = ({position, children}) => (
  <div
    css={css`
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      ${position}
    `}
  >
    {children}
  </div>
)

AbsoluteBox.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.element,
  ]),
}

const MainChart = () => (
  <div
    css={css`
      height: 100%;
      position: relative;
      border-left: 4px solid ${secondary[100]};
    `}
  >
    <AbsoluteBox position={{top: '30%'}}>
      <Small>Gastaste</Small>
      <Big>{formatAmount(spent)}</Big>
    </AbsoluteBox>
    <DonutChart income={income} spent={spent} />
    <AbsoluteBox position={{bottom: '1.5rem'}}>
      <Small>Disponible</Small>
      <Bigger>{formatAmount(income - spent)}</Bigger>
    </AbsoluteBox>
  </div>
)

export {MainChart}
