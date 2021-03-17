/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import {useForm, useFieldArray} from 'react-hook-form'
import {useData} from 'context/data'
import {Button, Big, Form, FormGroup, FormError, Small} from 'common-components'
// import {GroceriesIcon, FitnessIcon, RentIcon, IncomeIcon} from 'icons'
import {AddIcon} from 'icons'
import {List} from './components/list'
import {Actions} from './components/actions'

const categorias = ['depto', 'comida', 'tarjeta']

const Categories = ({handleAddCategory}) => (
  <div
    css={css`
      position: absolute;
      left: 1rem;
      top: 1rem;
      z-index: 1;
      width: 6rem;
      background-color: var(--background-color);
      padding: 0.5rem;
      border-radius: var(--border-radius);
    `}
  >
    <ul>
      {categorias.map(c => (
        <li key={c}>
          <Button
            variant="secondary"
            onClick={handleAddCategory}
            css={css`
              width: 100%;
              padding: 0.5rem;
              background-color: #fff;

              &:hover {
                background-color: var(--primary-400);
              }

              &:hover * {
                color: #fff;
              }
            `}
          >
            <Small>{c}</Small>
          </Button>
        </li>
      ))}
    </ul>
  </div>
)

const AddCategoryButton = ({handleAdd}) => (
  <Button
    variant="icon"
    css={css`
      border: 1px solid;
      width: 5rem;
      height: 5rem;
      padding: 0;
    `}
    onClick={handleAdd}
  >
    <div
      css={css`
        width: 50px;
        height: 50px;
        margin: auto;
        border: 1px dashed #000;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <AddIcon size={24} fill="#000" />
    </div>
  </Button>
)

const NewMovementCategories = ({fields, append}) => {
  const [add, setAdd] = React.useState(false)

  const handleAddCategory = e => {
    e.preventDefault()
    append({cat: e.currentTarget.textContent})
    setAdd(false)
  }

  const handleAdd = e => {
    e.preventDefault()
    setAdd(!add)
  }

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
      `}
    >
      {fields.map(c => (
        <div
          css={css`
            border: 1px solid;
            width: 5rem;
            height: 5rem;
            padding: 0;
            border-radius: var(--border-radius);
            position: relative;
          `}
        >
          <div
            css={css`
              width: 50px;
              height: 50px;
              border: 1px dashed #000;
              display: flex;
              align-items: center;
              justify-content: center;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              position: absolute;
            `}
          >
            {c.cat}
          </div>
        </div>
      ))}
      <div
        css={css`
          position: relative;
          width: 5rem;
        `}
      >
        {add && <Categories handleAddCategory={handleAddCategory} />}
        <AddCategoryButton handleAdd={handleAdd} />
      </div>
    </div>
  )
}

const MovementForm = () => {
  const {register, handleSubmit, errors, control, setError} = useForm({
    reValidateMode: 'onSubmit',
  })

  const {fields, append} = useFieldArray({
    control,
    name: 'categorias',
  })

  const onSubmit = data => {
    if (!fields.length) {
      setError('categoria', {message: 'Debe haber al menos una categoria'})
      return
    }
    console.log('data', data, fields)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
    >
      <label htmlFor="detalle">detalle</label>
      <input
        id="detalle"
        name="detalle"
        type="text"
        placeholder="Detalle"
        ref={register({required: 'Debe ingresar un detalle'})}
      />
      {errors.detalle && <FormError>{errors.detalle.message}</FormError>}
      <FormGroup>
        <label htmlFor="tipo">tipo de movimiento</label>
        <select name="tipo" id="tipo" ref={register}>
          <option value="egreso">Egreso</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <label htmlFor="fecha">fecha</label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          ref={register({required: 'Debe ingresar la fecha'})}
        />
      </FormGroup>
      {errors.fecha && <FormError>{errors.fecha.message}</FormError>}
      <FormGroup>
        <label htmlFor="monto">Monto</label>
        <input
          id="monto"
          name="monto"
          type="number"
          min="0"
          placeholder="Monto"
          ref={register({required: 'Debe ingresar el monto'})}
        />
        <label htmlFor="moneda">Moneda</label>
        <select name="moneda" id="moneda" ref={register}>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>
      </FormGroup>
      {errors.monto && <FormError>{errors.monto.message}</FormError>}
      <p>Categorias</p>
      <NewMovementCategories fields={fields} append={append} />
      {errors.categoria && <FormError>{errors.categoria.message}</FormError>}
      <Button type="submit">Guardar</Button>
    </Form>
  )
}

const NewMovement = () => (
  <div
    css={css`
      padding: 2rem;
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);
      max-width: 400px;
      height: 100%;

      & > :first-child {
        border-bottom: 4px solid var(--primary-400);
        margin-bottom: 1.5rem;
      }
    `}
  >
    <Big>Nuevo movimiento</Big>
    <MovementForm />
  </div>
)

const Movements = () => {
  const {data} = useData()
  // console.log('data', data)
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
        max-height: calc(100vh - var(--header-size));
      `}
    >
      <NewMovement />
      {/* <Actions />
      <List movements={data} /> */}
    </div>
  )
}

export {Movements}
