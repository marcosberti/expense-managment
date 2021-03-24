import {useForm} from 'react-hook-form'
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
    opciones: {monedas, tipoGasto},
    addExpense,
  } = useData()
  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    clearErrors,
    errors,
  } = useForm()

  const tipo = watch('tipo', 'fijo')
  const isFijo = tipo === 'fijo'
  const isCuotas = tipo === 'cuotas'

  const onSubmit = data => {
    const {categorias} = control.fieldArrayValuesRef.current
    if (!categorias.length) {
      setError('categoria', {message: 'Debe haber al menos una categoria'})
      return
    }
    addExpense(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="detalle">
        <LabelText>detalle</LabelText>
        <input
          id="detalle"
          name="detalle"
          type="text"
          placeholder="Detalle"
          autoComplete="off"
          ref={register({required: 'Campo obligatorio'})}
        />
      </label>
      <FormError message={errors?.detalle?.message} />
      <label htmlFor="tipo">
        <LabelText>tipo de gasto</LabelText>
        <select name="tipo" id="tipo" ref={register}>
          {tipoGasto.map(tg => (
            <option key={tg} value={tg}>
              {tg}
            </option>
          ))}
        </select>
      </label>
      <FormError message={errors?.tipo?.message} />
      {isFijo && <FechaFijo {...{register, errors}} />}
      {isCuotas && <FechaCuota {...{register, errors}} />}
      <Montos {...{register, errors, monedas}} />
      <ModalCategories {...{control, setError, clearErrors}} />
      <FormError message={errors?.categoria?.message} />
      <Button type="submit">Guardar</Button>
    </Form>
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
