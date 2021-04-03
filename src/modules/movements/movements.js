/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useLocation} from 'react-router-dom'
import {useData} from 'context/data'
import {Actions, Big, List, Small, MovementItem} from 'common-components'
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

const Movements = () => {
  const data = useData()
  const location = useLocation()
  const movements = getMovements(data, location)

  return (
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
      <List
        listProps={{
          gap: '0.5rem',
          overflowY: 'auto',
          flexDirection: 'column',
        }}
        items={movements}
        itemComponent={MovementItem}
        listNoItems={<NoMovements />}
      />
    </div>
  )
}

export {Movements}
