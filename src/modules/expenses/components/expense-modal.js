import {useModal} from 'context/modal'
import {Modal, Title} from 'common-components'
import {NewExpenseForm} from './new-expense-form'
import {EditExpenseForm} from './edit-expense-form'

const ExpenseModal = () => {
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
      <Title>{editDataRef ? 'Editar' : 'Nuevo'} Gasto</Title>
      {editDataRef ? (
        <EditExpenseForm editDataRef={editDataRef} />
      ) : (
        <NewExpenseForm />
      )}
    </Modal>
  )
}

export {ExpenseModal}
