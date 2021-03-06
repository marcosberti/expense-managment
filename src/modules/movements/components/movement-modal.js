import {useModal} from 'context/modal'
import {Modal, Title} from 'common-components'
import {NewMovementForm} from './new-movement-form'
import {EditMovementForm} from './edit-movement-form'

const MovementModal = () => {
  const {isOpen, editDataRef, handleModal} = useModal()
  return (
    <Modal
      modalProps={{
        '--category-size': '5rem',
        top: '0',
        right: '0',
        height: '100%',
        width: '400px',
        zIndex: '1',
      }}
      isOpen={isOpen}
      onClose={handleModal}
    >
      <Title>{editDataRef ? 'Editar' : 'Nuevo'} movimiento</Title>
      {editDataRef ? (
        <EditMovementForm editDataRef={editDataRef} />
      ) : (
        <NewMovementForm />
      )}
    </Modal>
  )
}

export {MovementModal}
