/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Big, CustomSVG, Title} from 'common-components'
import {formatAmount} from 'common-utils'

const CategoryItem = ({item: {nombre, icon, monto, color = '#1f33ad'}}) => (
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
    {nombre && <p>{nombre}</p>}
    {icon && <Big>{formatAmount(monto)}</Big>}
  </div>
)

CategoryItem.propTypes = {
  item: PropTypes.shape({
    nombre: PropTypes.string,
    icon: PropTypes.string.isRequired,
    monto: PropTypes.number,
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

export {List, CategoryItem}
