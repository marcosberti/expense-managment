import {useForm, FormProvider} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useData} from 'context/data'
import {
  Button,
  Form,
  FormGroup,
  LabelText,
  ModalCategories,
  Montos,
} from 'common-components'
import {FechaCuota, FechaFijo} from './forms'

const EditExpenseForm = ({editDataRef}) => {
  const data = useData()
  const {id, type} = editDataRef
  const expense = data[type].find(d => d.id === id)

  const methods = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: expense,
  })

  const {register, errors, watch, handleSubmit} = methods

  const isDisabled = watch('disabled', false)

  const onSubmit = mutatedExpense => {
    console.log('exp', mutatedExpense)
  }

  const isFixed = type === 'fixed'
  const isPayment = type === 'payments'

  return (
    <FormProvider {...{...methods, catRef: expense.categories}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="details">
            <LabelText>Detalle</LabelText>
            <input id="details" name="details" type="text" ref={register} />
          </label>
          {isFixed && (
            <label htmlFor="disabled">
              <LabelText>Desactivar</LabelText>
              <input
                id="disabled"
                name="disabled"
                type="checkbox"
                ref={register}
              />
            </label>
          )}
        </FormGroup>
        {!isDisabled && (
          <>
            {isFixed && <FechaFijo {...{register, errors}} />}
            {isPayment && <FechaCuota {...{register, errors}} />}
            <Montos />
            <ModalCategories />
          </>
        )}

        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}
EditExpenseForm.propTypes = {
  editDataRef: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
}

export {EditExpenseForm}
