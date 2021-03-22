import {Modal, Title} from 'common-components'
import {MovementForm} from './movement-form'

const MovementModal = props => (
  <Modal
    modalProps={{
      '--category-size': '5rem',
      top: '0',
      right: '0',
      height: '100%',
      width: '400px',
      zIndex: '1',
    }}
    {...props}
  >
    <Title>Nuevo movimiento</Title>
    <MovementForm />
  </Modal>
)

export {MovementModal}
