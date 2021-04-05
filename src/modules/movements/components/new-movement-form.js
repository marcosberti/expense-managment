import * as React from 'react'
import {useForm, useFormContext, FormProvider} from 'react-hook-form'
import {useData} from 'context/data'
import {useMutate} from 'context/mutate'
import {
  Button,
  Form,
  FormError,
  LabelText,
  Label,
  Input,
  Select,
  ModalCategories,
  Montos,
} from 'common-components'

const FormEgreso = () => {
  const data = useData()
  const formContext = useFormContext()
  const [gastos, setGastos] = React.useState(null)

  const {
    options: [{spentTypes}],
    fixed,
    payments,
  } = data

  const {register, watch, setValue, errors, catRef, setCatRef} = formContext

  const spentType = watch('spentType', 'variable')
  const expense = watch('expenseRef')

  React.useEffect(() => {
    const isVariable = spentType === 'variable'
    const isPayment = spentType === 'payments'
    const isFixed = spentType === 'fixed'
    if (isVariable) {
      setGastos(null)
    }

    if (isFixed) {
      setValue('expenseRef', 'default')
      setGastos(
        fixed.map(({id, details}) => ({
          key: id,
          value: details,
        }))
      )
    }

    if (isPayment) {
      setValue('expenseRef', 'default')
      setGastos(
        // eslint-disable-next-line no-shadow
        payments.map(({id, details, paids, payments}) => ({
          key: id,
          value: `${details} (${paids.filter(p => p).length + 1}/${payments})`,
        }))
      )
    }
    setCatRef([])
  }, [fixed, payments, setCatRef, setValue, spentType])

  React.useEffect(() => {
    if (!expense || expense === 'default') {
      setValue('amount', '')
      setValue('currency', 'ars')
      if (catRef?.length) {
        setCatRef([])
      }
      return
    }

    const isPayment = spentType === 'payments'
    const isFixed = spentType === 'fixed'
    let exp = {}

    if (isPayment) {
      exp = {...payments.find(({id}) => id === expense)}
      if (!Object.keys(exp).length) {
        return
      }
      exp.amount = exp.paymentAmount
      exp.details = `${exp.details} (${exp.paids.filter(p => p).length + 1}/${
        exp.payments
      })`
    }

    if (isFixed) {
      exp = {...fixed.find(({id}) => id === expense)}
      if (!Object.keys(exp).length) {
        return
      }
      const {amount} = {...exp.amounts.find(m => !m.inactiveDate)}
      exp.amount = amount
    }

    setValue('details', exp.details)
    setValue('amount', exp.amount)
    setValue('currency', exp.currency)
    setCatRef(exp.categories)
  }, [catRef, expense, fixed, payments, setCatRef, setValue, spentType])

  return (
    <>
      <Label htmlFor="spentType">
        <LabelText>tipo de egreso</LabelText>
        <Select id="spentType" name="spentType" ref={register}>
          {spentTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Label>
      {gastos && (
        <Label htmlFor="expenseRef">
          <LabelText>Gasto a pagar</LabelText>
          <Select
            id="expenseRef"
            name="expenseRef"
            ref={register({
              validate: val => val !== 'default',
            })}
          >
            <option value="default">Seleccione el gasto a pagar</option>
            {gastos.map(({key, value}) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </Label>
      )}
      <FormError message={errors?.expenseRef ? 'Campo obligatorio' : false} />
    </>
  )
}

const NewMovementForm = () => {
  const data = useData()
  const {addMovement} = useMutate()
  const [catRef, setCatRef] = React.useState([])
  const methods = useForm({
    reValidateMode: 'onSubmit',
  })

  const {
    options: [{currencies, movementTypes}],
  } = data

  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
    setError,
  } = methods

  const type = watch('type', 'income')
  const isSpent = type === 'spent'

  const onSubmit = movement => {
    const {categories} = control.fieldArrayValuesRef.current
    if (!categories.length) {
      setError('category', {message: 'Debe haber al menos una categoria'})
      return
    }
    addMovement({
      ...movement,
      categories: categories.map(({id, ...rest}) => rest),
    })
  }

  React.useEffect(() => {
    setValue('amount', null)
    setValue('currency', currencies[0])
  }, [currencies, setValue, type])

  return (
    <FormProvider {...{...methods, catRef, setCatRef, exchangeNeeded: true}}>
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
        <Label htmlFor="date">
          <LabelText>fecha</LabelText>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            ref={register({required: 'Campo obligatorio'})}
          />
        </Label>
        <FormError message={errors?.date?.message} />
        <Label htmlFor="type">
          <LabelText>tipo de movimiento</LabelText>
          <Select name="type" id="type" ref={register}>
            {movementTypes.map(movType => (
              <option key={movType} value={movType}>
                {movType}
              </option>
            ))}
          </Select>
        </Label>
        <FormError message={errors?.type?.message} />
        {isSpent && <FormEgreso />}
        <Montos />
        <ModalCategories />
        <FormError message={errors?.category?.message} />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

export {NewMovementForm}
