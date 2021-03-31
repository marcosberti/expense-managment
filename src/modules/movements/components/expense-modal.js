import {useForm, FormProvider} from 'react-hook-form'
import {useData} from 'context/data'
import {
  Modal,
  Title,
  Button,
  Form,
  FormError,
  LabelText,
} from 'common-components'
import {FechaCuota, FechaFijo, ModalCategories, Montos} from './common'

const ExpenseForm = () => {
  const {
    options: [{expenseTypes}],
    addExpense,
  } = useData()
  const methods = useForm()

  const {register, handleSubmit, watch, control, setError, errors} = methods

  const type = watch('type', 'fijo')
  const isFijo = type === 'fijo'
  const isCuotas = type === 'cuotas'

  const onSubmit = data => {
    let {categories} = control.fieldArrayValuesRef.current
    if (!categories.length) {
      setError('category', {message: 'Debe haber al menos una categoria'})
      return
    }
    categories = categories.map(({id, ...rest}) => rest)
    addExpense({...data, categories})
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="details">
          <LabelText>detalle</LabelText>
          <input
            id="details"
            name="details"
            type="text"
            placeholder="Detalle"
            autoComplete="off"
            ref={register({required: 'Campo obligatorio'})}
          />
        </label>
        <FormError message={errors?.details?.message} />
        <label htmlFor="type">
          <LabelText>tipo de gasto</LabelText>
          <select name="type" id="type" ref={register}>
            {expenseTypes.map(exType => (
              <option key={exType} value={exType}>
                {exType}
              </option>
            ))}
          </select>
        </label>
        <FormError message={errors?.type?.message} />
        {isFijo && <FechaFijo {...{register, errors}} />}
        {isCuotas && <FechaCuota {...{register, errors}} />}
        <Montos />
        <ModalCategories />
        <FormError message={errors?.categories?.message} />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

const ExpenseModal = props => (
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
    <Title>Nuevo Gasto</Title>
    <ExpenseForm />
  </Modal>
)

export {ExpenseModal}
