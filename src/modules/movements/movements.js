/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {GroceriesIcon, FitnessIcon, RentIcon, IncomeIcon} from 'icons'
import {List} from './components/list'
import {Actions} from './components/actions'

const data = [
  {
    amount: 5000,
    detail: 'mancuernas',
    type: 'e',
    categories: ['deporte'],
    date: '05-02-2021',
    icon: FitnessIcon,
  },
  {
    amount: 120000,
    detail: 'Sueldo',
    type: 'i',
    categories: ['ingreso'],
    date: '05-02-2021',
    icon: IncomeIcon,
  },
  {
    amount: 1300,
    detail: 'abastecedor',
    type: 'e',
    categories: ['mercado'],
    date: '10-02-2021',
    icon: GroceriesIcon,
  },
  {
    amount: 24000,
    detail: 'alquiler',
    type: 'e',
    categories: ['departamento'],
    date: '02-02-2021',
    icon: RentIcon,
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'e',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
    icon: FitnessIcon,
  },
]

const Movements = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      padding: 1rem;
      max-height: calc(100vh - var(--header-size));
    `}
  >
    <Actions />
    <List movements={data} />
  </div>
)

export {Movements}
