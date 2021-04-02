/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {
  Big,
  Button,
  CustomSVG,
  DesktopOnly,
  Small,
  Title,
} from 'common-components'
import {formatAmount, formatDate} from 'common-utils'
import {UpArrowIcon, DownArrowIcon, DeclineIcon} from 'icons'
import * as mq from 'media-queries'

const ItemDetail = ({details, date}) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
  >
    <Big>{details}</Big>
    <Small>{formatDate(date)}</Small>
  </div>
)

ItemDetail.propTypes = {
  details: PropTypes.string,
  date: PropTypes.string,
}

const ItemAmount = ({type, amount, currency, exchange}) => (
  <div
    css={css`
      display: flex;
      margin-left: auto;
      margin-right: 1rem;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;

      ${mq.large} {
        margin-right: 2rem;
      }
    `}
  >
    <Big>
      {type === 'spent' ? (
        <DownArrowIcon fill="#d41d1d" size={16} />
      ) : (
        <UpArrowIcon fill="#25a525" size={16} align="baseline" />
      )}
      {formatAmount(exchange ? amount * exchange : amount)}
    </Big>
    {exchange && (
      <Small>
        {formatAmount(amount, currency)} * {exchange}
      </Small>
    )}
  </div>
)

ItemAmount.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
  exchange: PropTypes.number,
  currency: PropTypes.string,
}

const MovementItem = ({
  item: {details, date, type, amount, currency, exchange, categories},
}) => (
  <div
    css={css`
      gap: 1rem;
      display: flex;
      padding: 1rem;
      align-items: center;
      margin-bottom: 0.5rem;
      justify-content: flex-start;
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);

      &:last-of-type {
        margin-bottom: 0;
      }

      ${mq.large} {
        padding: 2rem;
      }
    `}
  >
    <DesktopOnly>
      <ItemIcon icon={categories[0].icon} color={categories[0].color} />
    </DesktopOnly>
    <ItemDetail details={details} date={date} />
    <ItemAmount
      type={type}
      amount={amount}
      currency={currency}
      exchange={exchange}
    />
    <Button type="button" variant="icon">
      <DeclineIcon fill="#555" />
    </Button>
  </div>
)

MovementItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.func,
    details: PropTypes.string,
    date: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
    currency: PropTypes.string,
    categories: PropTypes.array,
    exchange: PropTypes.number,
  }).isRequired,
}

const ItemIcon = ({icon, size = 24, color, description}) => (
  <div
    css={css`
      padding: 0.5rem;
      border-radius: var(--border-radius);
      background-color: ${color}54;
      border: 1px solid ${color};
      height: 100%;
    `}
  >
    <CustomSVG fill={color} size={size} icon={icon} />
    {description && <Small>{description}</Small>}
  </div>
)

ItemIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string.isRequired,
  description: PropTypes.string,
}

const CategoryItem = ({
  item: {name, icon, amount, currency, color = '#1f33ad'},
}) => (
  <div
    css={css`
      width: 12rem;
      height: 12rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid ${color};
      background-color: ${color}54;
      border-radius: var(--border-radius);

      & > * {
        color: ${color};
      }
    `}
  >
    <CustomSVG icon={icon} fill={color} size={80} />
    {name && <p>{name}</p>}
    {icon && <Big>{formatAmount(amount, currency)}</Big>}
  </div>
)

CategoryItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string.isRequired,
    amount: PropTypes.number,
    currency: PropTypes.string,
    color: PropTypes.string.isRequired,
  }),
}

const List = ({title, listProps, items, itemComponent: Item, listNoItems}) => (
  <>
    {title && <Title>{title}</Title>}
    {items.length ? (
      <ul
        css={css`
          display: flex;
          ${listProps}
        `}
      >
        {items.map(item => (
          <li key={JSON.stringify(item)}>
            {Item ? <Item item={item} /> : item}
          </li>
        ))}
      </ul>
    ) : (
      listNoItems
    )}
  </>
)

List.propTypes = {
  title: PropTypes.string,
  listProps: PropTypes.object,
  items: PropTypes.array.isRequired,
  itemComponent: PropTypes.func,
  listNoItems: PropTypes.object.isRequired,
}

export {List, CategoryItem, ItemIcon, MovementItem}
