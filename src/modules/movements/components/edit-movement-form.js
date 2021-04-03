import {useForm, FormProvider} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useData} from 'context/data'
import {useMutate} from 'context/mutate'
import {Button, Form, LabelText, Montos} from 'common-components'

const EditMovementForm = ({editDataRef}) => {
  const data = useData()
  const {editMovement} = useMutate()
  const {movements} = data
  const {id} = editDataRef

  const movement = movements.find(m => m.id === id)
  const date = new Date(movement.date).toISOString().split('T')[0]
  const type = movement.spentType
    ? `${movement.type} - ${movement.spentType}`
    : movement.type

  const methods = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: movement,
  })
  const {handleSubmit} = methods

  const onSubmit = mov => {
    editMovement(movement, mov)
  }

  return (
    <FormProvider
      {...{...methods, exchangeNeeded: movement.currency !== 'ars'}}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="details">
          <LabelText>Detalle</LabelText>
          <input
            id="details"
            name="details"
            type="text"
            defaultValue={movement.details}
            disabled
          />
        </label>
        <label htmlFor="date">
          <LabelText>Fecha</LabelText>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={date}
            disabled
          />
        </label>
        <label htmlFor="type">
          <LabelText>Tipo de movimiento</LabelText>
          <input
            id="type"
            name="type"
            type="text"
            defaultValue={type}
            disabled
          />
        </label>
        <Montos />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

EditMovementForm.propTypes = {
  editDataRef: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export {EditMovementForm}
