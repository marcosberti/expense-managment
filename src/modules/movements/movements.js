/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import {useForm, useFieldArray} from 'react-hook-form'
import {useData} from 'context/data'
import {Button, Big, Form, FormError, Small} from 'common-components'
// import {GroceriesIcon, FitnessIcon, RentIcon, IncomeIcon} from 'icons'
import {AddIcon} from 'icons'
import {List} from './components/list'
import {Actions} from './components/actions'

// const data = [
//   {
//     amount: 5000,
//     detail: 'mancuernas',
//     type: 'e',
//     categories: ['deporte'],
//     date: '05-02-2021',
//     icon: FitnessIcon,
//   },
//   {
//     amount: 120000,
//     detail: 'Sueldo',
//     type: 'i',
//     categories: ['ingreso'],
//     date: '05-02-2021',
//     icon: IncomeIcon,
//   },
//   {
//     amount: 1300,
//     detail: 'abastecedor',
//     type: 'e',
//     categories: ['mercado'],
//     date: '10-02-2021',
//     icon: GroceriesIcon,
//   },
//   {
//     amount: 24000,
//     detail: 'alquiler',
//     type: 'e',
//     categories: ['departamento'],
//     date: '02-02-2021',
//     icon: RentIcon,
//   },
//   {
//     amount: 4222,
//     detail: 'bici',
//     type: 'e',
//     categories: ['deporte', 'ocio'],
//     date: '11-02-2021',
//     icon: FitnessIcon,
//   },
// ]

const categorias = ['depto', 'comida', 'tarjeta']

const NewMovement = () => {
  const [add, setAdd] = React.useState(false)
  const {register, handleSubmit, errors, control} = useForm({
    reValidateMode: 'onSubmit',
  })

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'categorias',
  })

  const handleAddCategory = e => {
    e.preventDefault()
    append({
      categoria: e.currentTarget.textContent,
      color: '',
    })
    setAdd(false)
  }

  const handleAdd = e => {
    e.preventDefault()
    setAdd(true)
  }

  console.log('fields', fields)

  console.error('motrar categorias, register en los inputs / select del form')
  console.error('ver color de categorias')
  console.error('submit')

  return (
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
      <Form
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <label htmlFor="detalle">detalle</label>
        <input id="detalle" name="detalle" type="text" placeholder="Detalle" />
        <label htmlFor="tipo">tipo de movimiento</label>
        <select name="tipo" id="tipo">
          <option value="egreso">Egreso</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <label htmlFor="fecha">fecha</label>
        <input
          id="fecha"
          name="fecha"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
        />
        <div
          css={css`
            display: flex;
          `}
        >
          <label htmlFor="monto">Monto</label>
          <input
            id="monto"
            name="monto"
            type="number"
            min="0"
            placeholder="Monto"
          />
          <label htmlFor="moneda">Moneda</label>
          <select name="moneda" id="moneda">
            <option value="ars">ARS</option>
            <option value="usd">USD</option>
          </select>
        </div>
        <p>Categorias</p>
        <label htmlFor="categorias">Categorias</label>
        <div
          css={css`
            position: relative;
            width: 5rem;
          `}
        >
          {add ? (
            <div
              css={css`
                position: absolute;
                bottom: -8rem;
                width: 5rem;
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
          ) : null}
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
        </div>
      </Form>
    </div>
  )
}

const Movements = () => {
  const {data} = useData()
  console.log('data', data)
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
