/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import {useForm} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useData} from 'context/data'
import {Button, Form, FormError, LabelText} from 'common-components'
import {ModalCategories, Montos} from '../common'

const FormEgreso = ({register, watch, setValue, errors}) => {
  const {
    opciones: {tipoEgreso},
    gastosFijos,
    gastosCuotas,
  } = useData()
  const [gastos, setGastos] = React.useState(null)
  const egreso = watch('tipo-egreso', 'variable')
  const gasto = watch('gasto-ref')

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
  }, [egreso, gastosCuotas, gastosFijos])

  React.useEffect(() => {
    if (gasto === 'default') {
      return
    }

    const isCuotas = egreso === 'cuotas'
    const isFijo = egreso === 'fijo'
    const data = {}

    if (isCuotas) {
      const _gasto = gastosCuotas.find(g => g.detalle === gasto)
      data.monto = _gasto.montoCuota
      data.moneda = _gasto.moneda
    }

    if (isFijo) {
      const _gasto = gastosFijos.find(g => g.detalle === gasto)
      const {monto} = _gasto.montos.find(m => !m.fechaInactivo)
      data.monto = monto
      data.moneda = _gasto.moneda
    }

    setValue('monto', data.monto)
    setValue('moneda', data.moneda)
  }, [gasto])

  return (
    <>
      <label htmlFor="tipo-egreso">
        <LabelText>tipo de egreso</LabelText>
        <select id="tipo-egreso" name="tipo-egreso" ref={register}>
          {tipoEgreso.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      {gastos && (
        <label htmlFor="gasto-ref">
          <LabelText>Gasto a pagar</LabelText>
          <select
            id="gasto-ref"
            name="gasto-ref"
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
      <FormError
        message={errors?.['gasto-ref'] ? 'Campo obligatorio' : false}
      />
    </>
  )
}

FormEgreso.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
}

const MovementForm = () => {
  const {
    opciones: {monedas, tipoMovimiento},
    addMovement,
  } = useData()
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
  })

  const tipo = watch('tipo', 'ingreso')
  const isEgreso = tipo === 'egreso'

  const onSubmit = data => {
    const {categorias} = control.fieldArrayValuesRef.current
    if (!categorias.length) {
      setError('categoria', {message: 'Debe haber al menos una categoria'})
      return
    }
    addMovement(data)
  }

  React.useEffect(() => {
    setValue('monto', null)
    setValue('moneda', monedas[0])
  }, [monedas, setValue, tipo])

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
      {isEgreso && (
        <FormEgreso {...{register, setValue, control, watch, errors}} />
      )}
      <Montos {...{register, errors, monedas}} />
      <ModalCategories {...{control, setError, clearErrors}} />
      <FormError message={errors?.categoria?.message} />
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

export {MovementForm}
