/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useForm, useFieldArray} from 'react-hook-form'
import {useData} from 'context/data'
import {Button, Big, Input, Label, FormError} from 'common-components'
// import {GroceriesIcon, FitnessIcon, RentIcon, IncomeIcon} from 'icons'
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

const NewMovement = () => {
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
      categoria: '',
      color: '',
    })
  }

  return (
    <div
      css={css`
        padding: 2rem;
        border-radius: var(--border-radius);
        background-color: var(--background-color-light);
      `}
    >
      <Big>Nuevo movimiento</Big>
      <form
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Label htmlFor="detalle">detalle</Label>
        <Input id="detalle" name="detalle" type="text" placeholder="Detalle" />
        <Label htmlFor="tipo">tipo de movimiento</Label>
        <select name="tipo" id="tipo">
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <Label htmlFor="fecha">fecha</Label>
        <input id="fecha" name="fecha" type="date" />
        <Label htmlFor="monto">Monto</Label>
        <Input
          id="monto"
          name="monto"
          type="number"
          min="0"
          placeholder="Monto"
        />
        <Label htmlFor="moneda">Moneda</Label>
        <select name="moneda" id="moneda">
          <option value="ars">ARS</option>
          <option value="usd">USD</option>
        </select>
        <div>
          <p>Categorias</p>
          <Button variant="icon" onClick={handleAddCategory}>
            +
          </Button>
        </div>
        <Label htmlFor="categorias">Categorias</Label>
      </form>
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
