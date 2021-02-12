/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {primary} from 'colors'
import {Big, Small} from 'common-components'
import {IncomeIcon, ExpensesIcon, MoneyBalanceIcon} from 'icons'
import * as mq from 'media-queries'
import {formatAmount} from 'common-utils'
import {ChartWrapper} from './chart-wrapper'
import {BarChart} from './bar-chart'

const AmountDetail = ({children}) => (
  <div
    css={css`
      position: relative;
      display: grid;
      grid-template-columns: 42px 1fr;
      grid-template-rows: auto;
      grid-template-areas:
        'icon text'
        'icon amount';

      & > svg {
        grid-area: icon;
      }

      & > small {
        grid-area: text;
      }

      & > div {
        grid-area: amount;
      }
    `}
  >
    {children}
  </div>
)

const MoneyBalance = ({income, spent}) => (
  <div
    css={css`
      display: flex;
      gap: 1rem;
      padding: 1rem;
    `}
  >
    {[
      {text: 'Ingresos', fill: primary[600], value: income, icon: IncomeIcon},
      {text: 'Gastos', fill: '#b71d1d', value: spent, icon: ExpensesIcon},
      {
        text: 'Balance',
        fill: '#1c1ccc',
        value: income - spent,
        icon: MoneyBalanceIcon,
      },
    ].map(({text, fill, icon: Icon, value}) => (
      <AmountDetail key={text}>
        <Icon fill={fill} size={42} />
        <Small>{text}</Small>
        <Big>{formatAmount(value)}</Big>
      </AmountDetail>
    ))}
  </div>
)

const DetailOverview = ({income, spent}) => (
  <div
    css={css`
      display: none;

      ${mq.large} {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
      }
    `}
  >
    <MoneyBalance income={income} spent={spent} />
    <ChartWrapper wrapperId="barchart-wrapper">
      <BarChart />
    </ChartWrapper>
  </div>
)

DetailOverview.propTypes = {
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {DetailOverview}
