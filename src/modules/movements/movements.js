/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useLocation} from 'react-router-dom'
import {useData} from 'context/data'
import {ListProvider, useList} from 'context/list'
import {
  Actions,
  Big,
  Button,
  List,
  Small,
  MovementItem,
} from 'common-components'
import {formatAmount} from 'common-utils'
import {DeclineIcon} from 'icons'
import {MovementModal} from './components/movement-modal'
import {getMovements} from './utils'

const NoMovements = () => (
  <div
    css={css`
      display: flex;
      padding: 2rem;
      text-align: center;
      flex-direction: column;
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);
    `}
  >
    <Big>Sin movimientos</Big>
    <Small>para el mes seleccionado</Small>
  </div>
)

const MovementsList = () => {
  const data = useData()
  const location = useLocation()
  const movements = getMovements(data, location)
  const {items, handleClear} = useList()

  const total = items.reduce((acc, {amount}) => acc + amount, 0)
  console.log('items', total)

  return (
    <div
      css={css`
        position: relative;
        overflow-y: auto;
      `}
    >
      {total > 0 ? (
        <div
          css={css`
            position: sticky;
            top: 0;
            width: 100%;
            height: 3rem;
            background-color: #ebf5d5;
            z-index: 1;
            text-align: end;
            padding: 0.75rem 14rem;
            border-radius: var(--border-radius);
            color: var(--text-color-light);
            display: flex;
            justify-content: flex-end;
            align-items: center;
          `}
        >
          Total:{' '}
          <span
            css={css`
              font-weight: 600;
              font-size: 1.25rem;
            `}
          >
            {formatAmount(total)}
          </span>
          <Button variant="icon" onClick={handleClear}>
            <DeclineIcon fill="#555" />
          </Button>
        </div>
      ) : null}
      <List
        listProps={{
          gap: '0.5rem',
          // overflowY: 'auto',
          flexDirection: 'column',
        }}
        items={movements}
        itemComponent={MovementItem}
        listNoItems={<NoMovements />}
      />
    </div>
  )
}

const Movements = () => (
  <div
    css={css`
      padding: 1rem;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - var(--header-size));
    `}
  >
    <MovementModal />
    <Actions monthSel sortCategory sortDate sortValue />
    <ListProvider>
      <MovementsList />
    </ListProvider>
  </div>
)

export {Movements}
