/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import {useData} from 'context/data'
import {Big, List, Small} from 'common-components'
import {Actions} from './components/actions'
import {CategoryModal} from './components/category-modal'
import {MovementModal} from './components/movement-modal'

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
  const {movimientos} = data
  const [openModal, setOpenModal] = React.useState(null)

  const onModal = modal => {
    setOpenModal(modal ?? null)
  }

  React.useEffect(() => {
    setOpenModal(null)
  }, [data])

  return (
    <div
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - var(--header-size));
      `}
    >
      <CategoryModal isOpen={openModal === 'categoria'} onClose={onModal} />
      <MovementModal isOpen={openModal === 'movimiento'} onClose={onModal} />
      <Actions onModal={onModal} />
      <List
        listProps={{}}
        items={movimientos}
        itemComponent={() => {}}
        listNoItems={<NoMovements />}
      />
    </div>
  )
}

export {Movements}
