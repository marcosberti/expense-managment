/* eslint-disable react-hooks/exhaustive-deps */
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
    opciones: {tipoEgreso},
    gastosFijos,
    gastosCuotas,
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
  const egreso = watch('tipoEgreso', 'variable')
  const gasto = watch('gastoRef')

  React.useEffect(() => {
    const isVariable = egreso === 'variable'
    const isCuotas = egreso === 'cuotas'
    const isFijo = egreso === 'fijo'
    if (isVariable) {
      setGastos(null)
    }

    if (isFijo) {
      setGastos(
        gastosFijos.map(g => ({
          key: g.detalle,
          value: g.detalle,
        }))
      )
    }

    if (isCuotas) {
      setGastos(
        gastosCuotas.map(g => ({
          key: g.detalle,
          value: `${g.detalle} (${g.pagos.filter(p => p).length + 1}/${
            g.cuotas
          })`,
        }))
      )
    }
    setCatRef([])
  }, [egreso, gastosCuotas, gastosFijos])

  React.useEffect(() => {
    console.log('gasto', gasto)
    if (!gasto || gasto === 'default') {
      setValue('detalle', '')
      setValue('monto', '')
      setValue('moneda', '')
      if (catRef.length) {
        setCatRef([])
      }
      return
    }

    const isCuotas = egreso === 'cuotas'
    const isFijo = egreso === 'fijo'
    let _gasto = {}

    if (isCuotas) {
      _gasto = {...gastosCuotas.find(g => g.detalle === gasto)}
      _gasto.monto = _gasto.montoCuota
      _gasto.detalle = `${_gasto.detalle} (${
        _gasto.pagos.filter(p => p).length + 1
      }/${_gasto.cuotas})`
    }

    if (isFijo) {
      _gasto = {...gastosFijos.find(g => g.detalle === gasto)}
      const {monto} = {..._gasto.montos.find(m => !m.fechaInactivo)}
      _gasto.monto = monto
    }

    setValue('detalle', _gasto.detalle)
    setValue('monto', _gasto.monto)
    setValue('moneda', _gasto.moneda)
    setCatRef(_gasto.categorias)
  }, [gasto])

  return (
    <>
      <label htmlFor="tipoEgreso">
        <LabelText>tipo de egreso</LabelText>
        <select id="tipoEgreso" name="tipoEgreso" ref={register}>
          {tipoEgreso.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      {gastos && (
        <label htmlFor="gastoRef">
          <LabelText>Gasto a pagar</LabelText>
          <select
            id="gastoRef"
            name="gastoRef"
            ref={register({
              validate: val => val !== 'default',
            })}
          >
            <option value="default">Seleccione el gasto a pagar</option>
            {gastos.map(g => (
              <option key={g.key} value={g.key}>
                {g.value}
              </option>
            ))}
          </select>
        </label>
      )}
      <FormError message={errors?.gastoRef ? 'Campo obligatorio' : false} />
    </>
  )
}

// FormEgreso.propTypes = {
//   register: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired,
//   watch: PropTypes.func.isRequired,
//   setValue: PropTypes.func.isRequired,
// }

const MovementForm = () => {
  const methods = useForm({
    reValidateMode: 'onSubmit',
  })
  const {
    opciones: {monedas, tipoMovimiento},
    addMovement,
  } = useData()
  const [catRef, setCatRef] = React.useState([])

  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
    setError,
  } = methods

  const tipo = watch('tipo', 'ingreso')
  const isEgreso = tipo === 'egreso'

  const onSubmit = data => {
    const movement = {...data}
    if (isEgreso) {
      const {categorias} = control.fieldArrayValuesRef.current
      if (!categorias.length) {
        setError('categoria', {message: 'Debe haber al menos una categoria'})
        return
      }
      movement.categorias = categorias.map(({id, ...rest}) => rest)
    }
    addMovement(movement)
  }

  React.useEffect(() => {
    setValue('monto', null)
    setValue('moneda', monedas[0])
  }, [monedas, setValue, tipo])

  return (
    <FormProvider {...{...methods, catRef, setCatRef}}>
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
        <label htmlFor="fecha">
          <LabelText>fecha</LabelText>
          <input
            id="fecha"
            name="fecha"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            ref={register({required: 'Campo obligatorio'})}
          />
        </label>
        <FormError message={errors?.fecha?.message} />
        <label htmlFor="tipo">
          <LabelText>tipo de movimiento</LabelText>
          <select name="tipo" id="tipo" ref={register}>
            {tipoMovimiento.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <FormError message={errors?.tipo?.message} />
        {isEgreso && <FormEgreso />}
        <Montos />
        {isEgreso && <ModalCategories />}
        <FormError message={errors?.categoria?.message} />
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
