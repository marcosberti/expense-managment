/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useData} from 'context/data'
import {Actions, Big, List, ExpensesItem} from 'common-components'
import {ExpenseModal} from './components/expense-modal'

const getExpenses = ({fixed, payments}) => {
  const expenses = []
  fixed.forEach(({id, details, active, currency, amounts, categories}) =>
    expenses.push({
      id,
      details,
      active,
      currency,
      categories,
      type: 'fixed',
      amount: amounts[amounts.length - 1].amount,
      date: amounts[amounts.length - 1].activeDate,
    })
  )

  payments.forEach(({id, details, amount, currency, paids, categories}) =>
    expenses.push({
      id,
      details,
      amount,
      currency,
      categories,
      type: 'payments',
      paids: paids.filter(p => p).length,
    })
  )

  return expenses.sort((a, b) =>
    a.categories[0].name > b.categories[0].name ? 1 : -1
  )
}

const NoMovements = () => (
  <div
    css={css`
      display: flex;
      padding: 2rem;
      text-align: center;
      flex-direction: column;
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);
    `}
  >
    <Big>Aún no se han agregado gastos</Big>
  </div>
)

const Expenses = () => {
  const data = useData()
  const expenses = getExpenses(data)

  return (
    <div
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - var(--header-size));
      `}
    >
      <ExpenseModal />
      <Actions />
      <List
        listProps={{
          gap: '0.5rem',
          overflowY: 'auto',
          flexDirection: 'column',
        }}
        items={expenses}
        itemComponent={ExpensesItem}
        listNoItems={<NoMovements />}
      />
    </div>
  )
}

export {Expenses}
