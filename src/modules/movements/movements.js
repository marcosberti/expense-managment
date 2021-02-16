/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Big, Small} from 'common-components'
import {formatAmount} from 'common-utils'
import {GroceriesIcon, UpArrowIcon, DownArrowIcon, DeclineIcon} from 'icons'

const data = [
  {
    amount: 5000,
    detail: 'mancuernas',
    type: 'egreso variable',
    categories: ['deporte'],
    date: '05-02-2021',
  },
  {
    amount: 120000,
    detail: 'Sueldo',
    type: 'ingreso',
    categories: ['ingreso'],
    date: '05-02-2021',
  },
  {
    amount: 1300,
    detail: 'abastecedor',
    type: 'egreso variable',
    categories: ['mercado'],
    date: '10-02-2021',
  },
  {
    amount: 24000,
    detail: 'alquiler',
    type: 'egreso fijo',
    categories: ['departamento'],
    date: '02-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
  {
    amount: 4222,
    detail: 'bici',
    type: 'egreso cuotas',
    categories: ['deporte', 'ocio'],
    date: '11-02-2021',
  },
]

const Movements = () => (
  <div
    css={css`
      /* padding: 1rem; */
      /* height: 885px; */
    `}
  >
    <ul
      css={css`
        overflow-y: scroll;
        /* hacer una ref del div yde ahi tomar height */
        height: 885px;
        padding: 1rem;
      `}
    >
      {data.map(d => (
        <li
          key={d.detail}
          css={css`
            border-radius: var(--border-radius);
            background-color: var(--background-color-light);
            padding: 2rem;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
          `}
        >
          <div
            css={css`
              padding: 0.5rem;
              border-radius: var(--border-radius);
              background-color: var(--primary-400-opacity);
              border: 1px solid var(--primary-400);
            `}
          >
            <GroceriesIcon fill="var(--primary-400)" size={24} />
          </div>
          <div>
            <Big>{d.detail}</Big>
            <Small>{d.date}</Small>
          </div>

          <Big
            css={css`
              margin-left: auto;
              margin-right: 2rem;
            `}
          >
            <UpArrowIcon fill="#d41d1d" size={18} align="baseline" />
            {formatAmount(d.amount)}
          </Big>
          <button
            type="button"
            css={css`
              padding: 0.5rem;
              border-radius: var(--border-radius);
              opacity: 0.5;
              transition: opacity 0.5s ease;

              &:hover {
                opacity: 1;
              }
            `}
          >
            <DeclineIcon fill="#555" />
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export {Movements}
