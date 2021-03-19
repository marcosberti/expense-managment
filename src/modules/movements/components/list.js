/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'
import {Button, Big, Small} from 'common-components'
import {formatAmount} from 'common-utils'
import {UpArrowIcon, DownArrowIcon, DeclineIcon} from 'icons'
import * as mq from 'media-queries'
import {ItemIcon} from './common'

const ItemDetail = ({detail, date}) => (
  <div>
    <Big>{detail}</Big>
    <Small>{date}</Small>
  </div>
)

ItemDetail.propTypes = {
  detail: PropTypes.string,
  date: PropTypes.string,
}

const ItemAmount = ({type, amount}) => (
  <Big
    css={css`
      margin-left: auto;
      margin-right: 1rem;

      ${mq.large} {
        margin-right: 2rem;
      }
    `}
  >
    {type === 'e' ? (
      <DownArrowIcon fill="#d41d1d" size={16} />
    ) : (
      <UpArrowIcon fill="#25a525" size={16} align="baseline" />
    )}
    {formatAmount(amount)}
  </Big>
)

ItemAmount.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
}

const Item = ({movement}) => {
  const {isMobile} = useDimentions()
  return (
    <li
      css={css`
        border-radius: var(--border-radius);
        background-color: var(--background-color-light);
        padding: 1rem;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;

        &:last-of-type {
          margin-bottom: 0;
        }

        ${mq.large} {
          padding: 2rem;
        }
      `}
    >
      {!isMobile ? <ItemIcon icon={movement.icon} /> : null}
      <ItemDetail detail={movement.detail} date={movement.date} />
      <ItemAmount type={movement.type} amount={movement.amount} />
      <Button type="button" variant="icon">
        <DeclineIcon fill="#555" />
      </Button>
    </li>
  )
}

Item.propTypes = {
  movement: PropTypes.shape({
    icon: PropTypes.func,
    detail: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
}

const List = ({movements}) => (
  <div
    css={css`
      overflow-y: auto;
    `}
  >
    {movements.length ? (
      <ul>
        {movements.map(movement => (
          <Item key={movement.detail} movement={movement} />
        ))}
      </ul>
    ) : (
      <div
        css={css`
          padding: 2rem;
          border-radius: var(--border-radius);
          background-color: var(--background-color-light);
          text-align: center;
        `}
      >
        <Big>Sin movimientos</Big>
        <Small>para el mes seleccionado</Small>
      </div>
    )}
  </div>
)

List.propTypes = {
  movements: PropTypes.array.isRequired,
}

export {List}
