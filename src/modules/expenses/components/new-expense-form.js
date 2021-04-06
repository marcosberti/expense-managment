import {useForm, FormProvider} from 'react-hook-form'
import {useData} from 'context/data'
import {useMutate} from 'context/mutate'
import {
  Button,
  Form,
  FormError,
  Input,
  Label,
  Select,
  LabelText,
  ModalCategories,
  Montos,
} from 'common-components'
import {FechaCuota, FechaFijo} from './forms'

const NewExpenseForm = () => {
  const data = useData()
  const {addExpense} = useMutate()
  const methods = useForm()

  const {
    options: [{expenseTypes}],
  } = data

  const {register, handleSubmit, watch, control, setError, errors} = methods

  const type = watch('type', 'fixed')
  const isFixed = type === 'fixed'
  const isPayment = type === 'payments'

  const onSubmit = expense => {
    let {categories} = control.fieldArrayValuesRef.current
    if (!categories.length) {
      setError('category', {message: 'Debe haber al menos una categoria'})
      return
    }
    categories = categories.map(({id, ...rest}) => rest)
    addExpense({...expense, categories})
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="details">
          <LabelText>detalle</LabelText>
          <Input
            id="details"
            name="details"
            type="text"
            placeholder="Detalle"
            autoComplete="off"
            ref={register({required: 'Campo obligatorio'})}
          />
        </Label>
        <FormError message={errors?.details?.message} />
        <Label htmlFor="type">
          <LabelText>tipo de gasto</LabelText>
          <Select name="type" id="type" ref={register}>
            {expenseTypes.map(exType => (
              <option key={exType} value={exType}>
                {exType}
              </option>
            ))}
          </Select>
        </Label>
        <FormError message={errors?.type?.message} />
        {isFixed && <FechaFijo {...{register, errors}} />}
        {isPayment && <FechaCuota {...{register, errors}} />}
        <Montos />
        <ModalCategories />
        <FormError message={errors?.categories?.message} />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

export {NewExpenseForm}
