/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {primary} from 'colors'
import {Big, Small} from 'common-components'
import {IncomeIcon, ExpensesIcon, MoneyBalanceIcon} from 'icons'
import * as mq from 'media-queries'
import {formatAmount} from 'common-utils'

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

const DetailOverview = ({income, spent}) => {
  const size = 42
  return (
    <div
      css={css`
        flex-grow: 1;
        order: 2;
        position: relative;

        ${mq.large} {
          order: 1;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1rem;
          padding: 1rem;
        `}
      >
        <AmountDetail>
          <IncomeIcon fill={primary[600]} size={size} />
          <Small>Ingresos</Small>
          <Big>{formatAmount(income)}</Big>
        </AmountDetail>
        <AmountDetail>
          <ExpensesIcon fill="#b71d1d" size={size} />
          <Small>Gastos</Small>
          <Big>{formatAmount(spent)}</Big>
        </AmountDetail>
        <AmountDetail>
          <MoneyBalanceIcon fill="#1c1ccc" size={size} />
          <Small>Balance</Small>
          <Big>{formatAmount(income - spent)}</Big>
        </AmountDetail>
      </div>
    </div>
  )
}

DetailOverview.propTypes = {
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {DetailOverview}
