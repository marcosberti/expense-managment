/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Big, CustomSVG, Small, Title} from 'common-components'
import {formatAmount} from 'common-utils'

// const ItemDetail = ({detail, date}) => (
//   <div>
//     <Big>{detail}</Big>
//     <Small>{date}</Small>
//   </div>
// )

// ItemDetail.propTypes = {
//   detail: PropTypes.string,
//   date: PropTypes.string,
// }

// const ItemAmount = ({type, amount}) => (
//   <Big
//     css={css`
//       margin-left: auto;
//       margin-right: 1rem;

//       ${mq.large} {
//         margin-right: 2rem;
//       }
//     `}
//   >
//     {type === 'e' ? (
//       <DownArrowIcon fill="#d41d1d" size={16} />
//     ) : (
//       <UpArrowIcon fill="#25a525" size={16} align="baseline" />
//     )}
//     {formatAmount(amount)}
//   </Big>
// )

// ItemAmount.propTypes = {
//   type: PropTypes.string,
//   amount: PropTypes.number,
// }

// const Item = ({movement}) => (
//   <li
//     css={css`
//       gap: 1rem;
//       display: flex;
//       padding: 1rem;
//       align-items: center;
//       margin-bottom: 0.5rem;
//       justify-content: flex-start;
//       border-radius: var(--border-radius);
//       background-color: var(--background-color-light);

//       &:last-of-type {
//         margin-bottom: 0;
//       }

//       ${mq.large} {
//         padding: 2rem;
//       }
//     `}
//   >
//     <DesktopOnly>
//       <ItemIcon icon={movement.icon} />
//     </DesktopOnly>
//     <ItemDetail detail={movement.detail} date={movement.date} />
//     <ItemAmount type={movement.type} amount={movement.amount} />
//     <Button type="button" variant="icon">
//       <DeclineIcon fill="#555" />
//     </Button>
//   </li>
// )

// Item.propTypes = {
//   movement: PropTypes.shape({
//     icon: PropTypes.func,
//     detail: PropTypes.string,
//     date: PropTypes.string,
//     type: PropTypes.string,
//     amount: PropTypes.number,
//   }).isRequired,
// }

// const List = ({movements}) => (
//   <div
//     css={css`
//       overflow-y: auto;
//     `}
//   >
//     {movements.length ? (
//       <ul>
//         {movements.map(movement => (
//           <Item key={movement.detail} movement={movement} />
//         ))}
//       </ul>
//     ) : (
//       <div
//         css={css`
//           padding: 2rem;
//           text-align: center;
//           border-radius: var(--border-radius);
//           background-color: var(--background-color-light);
//         `}
//       >
//         <Big>Sin movimientos</Big>
//         <Small>para el mes seleccionado</Small>
//       </div>
//     )}
//   </div>
// )

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
  item: {nombre, icon, monto, moneda, color = '#1f33ad'},
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
    {nombre && <p>{nombre}</p>}
    {icon && <Big>{formatAmount(monto, moneda)}</Big>}
  </div>
)

CategoryItem.propTypes = {
  item: PropTypes.shape({
    nombre: PropTypes.string,
    icon: PropTypes.string.isRequired,
    monto: PropTypes.number,
    moneda: PropTypes.string,
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

export {List, CategoryItem, ItemIcon}
