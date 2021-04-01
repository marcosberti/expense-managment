import * as React from 'react'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'
import {useData} from './data'

const MutateContext = React.createContext()
MutateContext.displayName = 'MutateContext'

const formatMovement = movement => {
  const format = {
    amount: Number(movement.amount),
    date: new Date(`${movement.date}T00:00:00`).getTime(),
  }

  if (movement.exchange) {
    format.exchange = Number(movement.exchange)
  }

  return {
    ...movement,
    ...format,
  }
}

const formatExpense = expense => {
  if (expense.type === 'fijo') {
    const {activeDate, inactiveDate, amount, type, ...rest} = expense
    return [
      {
        collection: 'fixed',
        data: {
          ...rest,
          amounts: [
            {
              activeDate: new Date(`${activeDate}T00:00:00`).getTime(),
              inactiveDate: false,
              amount: Number(amount),
            },
          ],
        },
      },
    ]
  }
  if (expense.type === 'cuotas') {
    const {type, ...rest} = expense
    const firstPaymentDate = new Date(`${expense.firstPaymentDate}T00:00:00`)
    rest.firstPaymentDate = firstPaymentDate.getTime()
    rest.payments = Number(rest.payments)
    rest.amount = Number(rest.amount)

    const year = firstPaymentDate.getFullYear()
    const month = firstPaymentDate.getMonth()

    const lastPaymentDate = new Date(
      year,
      month + rest.cuotas,
      0,
      0,
      0,
      0
    ).getTime()

    return [
      {
        collection: 'payments',
        data: {
          ...rest,
          lastPaymentDate,
          paymentAmount: rest.amount / rest.payments,
          paids: new Array(rest.payments).fill(false),
        },
      },
    ]
  }

  throw new Error('Unhandled expense type')
}

const formatMonthly = (monthly, movement) => {
  const year = movement.date.getFullYear()
  const month = movement.date.getMonth()
  let data = monthly.find(m => m.year === year && m.month === month)
  if (!data) {
    data = {
      year,
      month,
      income: 0,
      spent: 0,
    }
  }

  const amount = movement.exchange
    ? movement.amount * movement.exchange
    : movement.amount
  data[movement.tipo] += amount
  return data
}

const getMovementBody = (movement, monthly, payments) => {
  const formattedMovement = formatMovement(movement)
  const formattedMonthly = formatMonthly(monthly, movement)
  const body = [
    {
      collection: 'movement',
      data: formattedMovement,
    },
    {
      collection: 'monthly',
      monthly: formattedMonthly,
    },
  ]

  if (movement.spentType === 'cuotas') {
    const payment = payments.find(({id}) => id === movement.expenseRef)
    const index = payment.payments.indexOf(false)
    payment.paids[index] = true
    body.push({
      collection: 'payments',
      data: payment,
    })
  }

  return body
}

const MutateProvider = ({children}) => {
  const data = useData()
  const client = useClient()
  const {setPending, setError, setData} = data

  /**
   * mutate a category
   */
  const mutateCategory = React.useCallback(
    async category => {
      console.log('cat', category)
      const body = [{collection: 'categories', data: category}]
      // setPending()
      // const {data, error} = await client('mutate-data', {body})
      // if (error) {
      //   setError(error)
      //   return
      // }

      // setData(data)
    },
    [client]
  )

  /**
   * mutate an expense
   */
  const mutateExpense = React.useCallback(
    async expense => {
      console.log('gasto', expense)
      // setPending()
      // const body = formatExpense(expense)
      // const {data, error} = await client('mutate-data', {body})
      // if (error) {
      //   setError(error)
      //   return
      // }

      // setData(data)
    },
    [client]
  )

  /**
   * mutate a new movement
   */
  const mutateMovement = React.useCallback(
    async movement => {
      const {monthly, payments} = data
      const body = getMovementBody(movement, monthly, payments)
      console.log('mov', body)
      // setPending()
      // const {data, error} = await client('mutate-data', {body})
      // if (error) {
      //   setError(error)
      //   return
      // }

      // setData(data)
    },
    [client, data]
  )

  const value = React.useMemo(
    () => ({
      mutateCategory,
      mutateExpense,
      mutateMovement,
    }),
    [mutateCategory, mutateExpense, mutateMovement]
  )

  return (
    <MutateContext.Provider value={value}>{children}</MutateContext.Provider>
  )
}

MutateProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

const useMutate = () => {
  const context = React.useContext(MutateContext)
  if (context === undefined) {
    throw new Error('useMutate must be used within a MutateProvider')
  }
  return context
}

export {MutateProvider, useMutate}
