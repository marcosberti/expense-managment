/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import {useData} from 'context/data'
import {List} from './components/list'
import {Actions} from './components/actions'
import {NewMovement} from './components/new-movement'
import {NewCategory} from './components/new-category'

const Movements = () => {
  const {movimientos} = useData()
  const [openModal, setOpenModal] = React.useState(null)
  // console.log('data', data)
  const onOpenModal = modal => {
    setOpenModal(modal)
  }
  const listener = React.useCallback(e => {
    const {id} = e.target
    if (id?.includes('modal-backdrop')) {
      setOpenModal(null)
    }
  }, [])

  React.useEffect(() => {
    if (openModal) {
      document.addEventListener('click', listener)
    } else {
      document.removeEventListener('click', listener)
    }
  }, [openModal, listener])

  return (
    <div
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - var(--header-size));
      `}
    >
      {openModal === 'movimiento' && <NewMovement />}
      {openModal === 'categoria' && <NewCategory />}
      <Actions onOpenModal={onOpenModal} />
      <List movements={movimientos} />
    </div>
  )
}

export {Movements}
