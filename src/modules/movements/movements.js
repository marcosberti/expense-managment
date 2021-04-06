/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useLocation} from 'react-router-dom'
import {useData} from 'context/data'
import {ListProvider} from 'context/list'
import {
  Actions,
  Big,
  List,
  ListTotals,
  Small,
  MovementItem,
} from 'common-components'
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

  return (
    <div
      css={css`
        overflow-y: auto;
        position: relative;
      `}
    >
      <ListTotals />
      <List
        listProps={{
          gap: '0.5rem',
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
