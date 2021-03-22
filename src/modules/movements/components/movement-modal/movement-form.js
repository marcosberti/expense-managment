import * as React from 'react'
import {useForm, useFieldArray} from 'react-hook-form'
import PropTypes from 'prop-types'
import {useData} from 'context/data'
import {Button, Form, FormGroup, FormError, LabelText} from 'common-components'
import {MovementCategories} from './movement-categories'

const FechaBasica = ({register, errors}) => (
  <>
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
  </>
)

FechaBasica.propTypes = {
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const FechaCuota = ({register, errors}) => (
  <FormGroup>
    <label htmlFor="fechaPrimerPago">
      <LabelText>fecha primer pago</LabelText>
      <input
        id="fechaPrimerPago"
        name="fechaPrimerPago"
        type="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        ref={register({
          required: 'Campo obligatorio',
        })}
      />
    </label>
    <FormError message={errors?.fechaPrimerPago?.message} />
    <label htmlFor="cuotas">
      <LabelText>cuotas</LabelText>
      <input
        id="cuotas"
        name="cuotas"
        type="number"
        step="3"
        min="0"
        placeholder="Cuotas"
        ref={register({required: 'Campo obligatorio'})}
      />
    </label>
    <FormError message={errors?.cuotas?.message} />
  </FormGroup>
)

FechaCuota.propTypes = {
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const FechaFijo = ({register, errors}) => (
  <>
    <FormGroup>
      <label htmlFor="fechaActivo">
        <LabelText>fecha activo</LabelText>
        <input
          id="fechaActivo"
          name="fechaActivo"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({
            required: 'Campo obligatorio',
          })}
        />
      </label>
      <label htmlFor="fechaInactivo">
        <LabelText>fecha inactivo</LabelText>
        <input
          id="fechaInactivo"
          name="fechaInactivo"
          type="date"
          ref={register}
        />
      </label>
    </FormGroup>
    <FormError message={errors?.fechaActivo?.message} />
  </>
)

FechaFijo.propTypes = {
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const FormEgreso = ({register, watch, errors}) => {
  const egreso = watch('tipo-egreso', 'variable')
  const isVariable = egreso === 'variable'
  const isCuotas = egreso === 'cuotas'
  const isFijo = egreso === 'fijo'

  return (
    <>
      <label htmlFor="tipo-egreso">
        <LabelText>tipo de egreso</LabelText>
        <select id="tipo-egreso" name="tipo-egreso" ref={register}>
          <option value="variable">Variable</option>
          <option value="cuotas">Cuotas</option>
          <option value="fijo">Fijo</option>
        </select>
      </label>
      {isVariable && <FechaBasica {...{register, errors}} />}
      {isFijo && <FechaFijo {...{register, errors}} />}
      {isCuotas && <FechaCuota {...{register, errors}} />}
    </>
  )
}

FormEgreso.propTypes = {
  register: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  watch: PropTypes.object.isRequired,
}

const MovementForm = () => {
  const {categorias, addMovement} = useData()
  const tipoRef = React.useRef('default')
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

  const {fields, append} = useFieldArray({
    control,
    name: 'categorias',
  })

  const tipo = watch('tipo', 'default')
  const isEgreso = tipo === 'egreso'
  const isIngreso = tipo === 'ingreso'

  if (tipoRef.current !== tipo) {
    tipoRef.current = tipo
    setValue('monto', null)
    setValue('moneda', 'ars')
  }

  const onAddCat = catName => {
    const exist = Boolean(fields.find(f => f.nombre === catName))
    if (exist) {
      setError('categoria', {
        message: `Categoria ${catName} ya ha sido agregada`,
      })
      return
    }

    const categoria = categorias.find(c => c.nombre === catName)
    append(categoria)
    clearErrors('categoria')
  }

  const onSubmit = data => {
    if (!fields.length) {
      setError('categoria', {message: 'Debe haber al menos una categoria'})
      return
    }
    addMovement(data)
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
        <LabelText>tipo de movimiento</LabelText>
        <select
          name="tipo"
          id="tipo"
          defaultValue="default"
          ref={register({
            validate: value =>
              value === 'default'
                ? 'Debe seleccionar un tipo de movimiento'
                : null,
          })}
        >
          <option value="default">Seleccione el tipo de movimiento</option>
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </label>
      <FormError message={errors?.tipo?.message} />
      {isIngreso && <FechaBasica {...{register, errors}} />}
      {isEgreso && <FormEgreso {...{register, control, watch, errors}} />}
      {(isEgreso || isIngreso) && (
        <>
          <FormGroup>
            <label htmlFor="monto">
              <LabelText>Monto</LabelText>
              <input
                id="monto"
                name="monto"
                type="number"
                min="0"
                placeholder="Monto"
                ref={register({required: 'Campo obligatorio'})}
              />
            </label>
            <label htmlFor="moneda">
              <LabelText>Moneda</LabelText>
              <select id="moneda" name="moneda" ref={register}>
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </FormGroup>
          <FormError message={errors?.monto?.message} />
        </>
      )}
      <MovementCategories fields={fields} onAddCat={onAddCat} />
      <FormError message={errors?.categoria?.message} />
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

export {MovementForm}
