import * as React from 'react'
import {useForm, useFormContext, FormProvider} from 'react-hook-form'
import {useData} from 'context/data'
import {
  Button,
  Form,
  FormError,
  LabelText,
  Modal,
  Title,
} from 'common-components'
import {ModalCategories, Montos} from './common'

const FormEgreso = () => {
  const {
    options: [{spentTypes}],
    fixed,
    payments,
  } = useData()
  const {
    register,
    watch,
    setValue,
    errors,
    catRef,
    setCatRef,
  } = useFormContext()
  const [gastos, setGastos] = React.useState(null)
  const spentType = watch('spentType', 'variable')
  const expense = watch('expenseRef')

  React.useEffect(() => {
    const isVariable = spentType === 'variable'
    const isCuotas = spentType === 'cuotas'
    const isFijo = spentType === 'fijo'
    if (isVariable) {
      setGastos(null)
    }

    if (isFijo) {
      setGastos(
        fixed.map(({detail}) => ({
          key: detail,
          value: detail,
        }))
      )
    }

    if (isCuotas) {
      setGastos(
        payments.map(({details, padis, payments}) => ({
          key: details,
          value: `${details} (${padis.filter(p => p).length + 1}/${payments})`,
        }))
      )
    }
    setCatRef([])
  }, [fixed, payments, setCatRef, spentType])

  React.useEffect(() => {
    if (!expense || expense === 'default') {
      setValue('amount', '')
      setValue('currency', 'ars')
      if (catRef.length) {
        setCatRef([])
      }
      return
    }

    const isCuotas = spentType === 'cuotas'
    const isFijo = spentType === 'fijo'
    let _gasto = {}

    if (isCuotas) {
      _gasto = {...payments.find(({details}) => details === expense)}
      _gasto.amount = _gasto.paymentAmount
      _gasto.details = `${_gasto.details} (${
        _gasto.paids.filter(p => p).length + 1
      }/${_gasto.payments})`
    }

    if (isFijo) {
      _gasto = {...fixed.find(({details}) => details === expense)}
      const {amount} = {..._gasto.amounts.find(m => !m.inactiveDate)}
      _gasto.amount = amount
    }

    setValue('detalle', _gasto.detalle)
    setValue('monto', _gasto.monto)
    setValue('moneda', _gasto.moneda)
    setCatRef(_gasto.categorias)
  }, [catRef, expense, fixed, payments, setCatRef, setValue, spentType])

  return (
    <>
      <label htmlFor="spentType">
        <LabelText>tipo de egreso</LabelText>
        <select id="spentType" name="spentType" ref={register}>
          {spentTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      {gastos && (
        <label htmlFor="expenseRef">
          <LabelText>Gasto a pagar</LabelText>
          <select
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
          </select>
        </label>
      )}
      <FormError message={errors?.expenseRef ? 'Campo obligatorio' : false} />
    </>
  )
}

const MovementForm = () => {
  const [catRef, setCatRef] = React.useState([])
  const {
    options: [{currencies, movementType}],
    addMovement,
  } = useData()
  const methods = useForm({
    reValidateMode: 'onSubmit',
  })

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
  const isEgreso = type === 'egreso'

  const onSubmit = data => {
    const {categories} = control.fieldArrayValuesRef.current
    if (!categories.length) {
      setError('category', {message: 'Debe haber al menos una categoria'})
      return
    }
    addMovement({
      ...data,
      categories: categories.map(({id, ...rest}) => rest),
    })
  }

  // React.useEffect(() => {
  // setValue('amount', null)
  // setValue('currency', currencies[0])
  // }, [currencies, setValue, type])

  return (
    <FormProvider {...{...methods, catRef, setCatRef, exchangeNeeded: true}}>
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
        <label htmlFor="date">
          <LabelText>fecha</LabelText>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            ref={register({required: 'Campo obligatorio'})}
          />
        </label>
        <FormError message={errors?.date?.message} />
        <label htmlFor="type">
          <LabelText>tipo de movimiento</LabelText>
          <select name="type" id="type" ref={register}>
            {movementType.map(movType => (
              <option key={movType} value={movType}>
                {movType}
              </option>
            ))}
          </select>
        </label>
        <FormError message={errors?.type?.message} />
        {isEgreso && <FormEgreso />}
        <Montos />
        <ModalCategories />
        <FormError message={errors?.category?.message} />
        <Button type="submit">Guardar</Button>
      </Form>
    </FormProvider>
  )
}

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
