import {useForm, FormProvider} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useData} from 'context/data'
import {useMutate} from 'context/mutate'
import {Button, Form, Input, Label, LabelText, Montos} from 'common-components'

const EditMovementForm = ({editDataRef}) => {
  const data = useData()
  const {addMovement, editMovement} = useMutate()
  const {movements} = data
  const {id} = editDataRef

  const movement = id ? movements.find(m => m.id === id) : editDataRef
  const dateObj = movement.date ? new Date(movement.date) : new Date()
  const date = dateObj.toISOString().split('T')[0]
  const type = movement.spentType
    ? `${movement.type} - ${movement.spentType}`
    : movement.type

  const methods = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: movement,
  })
  const {handleSubmit} = methods

  const onSubmit = mov => {
    if (id) {
      editMovement(movement, mov)
    } else {
      addMovement({...movement, ...mov, date})
    }
  }

  return (
    <FormProvider
      {...{...methods, exchangeNeeded: movement.currency !== 'ars'}}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="details">
          <LabelText>Detalle</LabelText>
          <Input
            id="details"
            name="details"
            type="text"
            defaultValue={movement.details}
            disabled
          />
        </Label>
        <Label htmlFor="date">
          <LabelText>Fecha</LabelText>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={date}
            disabled={Boolean(id)}
          />
        </Label>
        <Label htmlFor="type">
          <LabelText>Tipo de movimiento</LabelText>
          <Input
            id="type"
            name="type"
            type="text"
            defaultValue={type}
            disabled
          />
        </Label>
        <Montos />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

EditMovementForm.propTypes = {
  editDataRef: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}

export {EditMovementForm}
