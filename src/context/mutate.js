import * as React from 'react'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'
import {getDateData} from 'common-utils'
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

const formatExpense = (expense, operation) => {
  if (expense.type === 'fixed') {
    const {activeDate, inactiveDate, amount, type, ...rest} = expense
    console.log('inactiveDate', inactiveDate)
    return [
      {
        collection: 'fixed',
        operation: operation ?? (expense.id ? 'update' : 'set'),
        data: {
          ...rest,
          active: Boolean(!inactiveDate),
          amounts: [
            {
              activeDate: new Date(`${activeDate}T00:00:00`).getTime(),
              inactiveDate: inactiveDate
                ? new Date(`${inactiveDate}T00:00:00`).getTime()
                : false,
              amount: Number(amount),
            },
          ],
        },
      },
    ]
  }
  if (expense.type === 'payments') {
    const {type, ...rest} = expense
    const firstPaymentDate = new Date(`${expense.firstPaymentDate}T00:00:00`)
    rest.firstPaymentDate = firstPaymentDate.getTime()
    rest.payments = Number(rest.payments)
    rest.amount = Number(rest.amount)

    const year = firstPaymentDate.getFullYear()
    const month = firstPaymentDate.getMonth()

    const lastPaymentDate = new Date(
      year,
      month + rest.payments,
      0,
      0,
      0,
      0
    ).getTime()

    return [
      {
        collection: 'payments',
        operation: operation ?? (expense.id ? 'update' : 'set'),
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

const formatMonthly = (monthly, movement, operation) => {
  const {year, month} = getDateData(movement.date)
  let data = monthly.find(m => m.year === year && m.month === month)
  if (!data) {
    data = {
      year,
      month,
      income: 0,
      spent: 0,
    }
  }

  let amount = movement.exchange
    ? movement.amount * movement.exchange
    : movement.amount
  amount = operation === 'delete' ? amount * -1 : amount
  data[movement.type] += amount
  return data
}

const getNewMovementBody = (movement, monthly, payments, operation) => {
  const formattedMovement = formatMovement(movement)
  const formattedMonthly = formatMonthly(monthly, formattedMovement, operation)
  const body = [
    {
      collection: 'movements',
      operation: operation ?? movement.id ? 'update' : 'set',
      data: formattedMovement,
    },
    {
      collection: 'monthly',
      operation: formattedMonthly.id ? 'update' : 'set',
      data: formattedMonthly,
    },
  ]

  if (movement.spentType === 'payments') {
    const payment = payments.find(({id}) => id === movement.expenseRef)
    let index = payment.paids.indexOf(false)
    const isPaying = operation !== 'delete'
    index = isPaying ? index : index - 1
    payment.paids[index] = isPaying
    body.push({
      collection: 'payments',
      operation: 'update',
      data: payment,
    })
  }

  return body
}

const getEditedMovementBody = (oldMov, newMov, monthly) => {
  const {year, month} = getDateData(oldMov.date)
  const monthlyData = monthly.find(m => m.year === year && m.month === month)
  const newAmount = Number(newMov.amount)
  monthlyData[oldMov.type] += oldMov.amount * -1 + newAmount
  const body = [
    {
      collection: 'movements',
      operation: 'update',
      data: {...oldMov, ...newMov, amount: newAmount},
    },
    {
      collection: 'monthly',
      operation: 'update',
      data: monthlyData,
    },
  ]

  return body
}

const getDeletedBody = (id, collection, movements, monthly, payments) => {
  const body = [
    {
      collection,
      operation: 'delete',
      data: {id},
    },
  ]
  if (collection === 'movements') {
    const movement = movements.find(m => m.id === id)
    const {year, month} = getDateData(movement.date)
    const monthlyData = monthly.find(m => m.year === year && m.month === month)
    monthlyData[movement.type] -= movement.exchange
      ? movement.amount * movement.exchange
      : movement.amount
    body.push({
      collection: 'monthly',
      operation: 'update',
      data: monthlyData,
    })
    if (movement.spentType === 'payments') {
      let [details, paymentNo] = movement.details.split('(')
      details = details.replace(' ', '')
      paymentNo = Number(paymentNo.split('/')[0])
      const payment = payments.find(p => p.details === details)
      if (!payment) {
        console.warn(
          'No se encontro el gasto correspondiente.\n Debe corresponder a uno ya pagado en su toatlidad. \n Pruebe manualmente'
        )
        return []
      }
      const paids = payment.paids.filter(p => p).length
      if (paids !== paymentNo) {
        alert('debe eliminar los pagos posteriores antes de eliminar este')
        return []
      }

      payment.paids[paymentNo - 1] = false
      body.push({
        collection: 'payments',
        operation: 'update',
        data: payment,
      })
    }
  }

  return body
}

const MutateProvider = ({children}) => {
  const data = useData()
  const client = useClient()
  const {setPending, setError, setData} = data

  /**
   * add a category
   */
  const addCategory = React.useCallback(
    async (category, operation = 'set') => {
      const body = [{collection: 'categories', operation, data: category}]
      setPending()
      const {data: rData, error} = await client('mutate-data', {body})
      if (error) {
        setError(error)
        return
      }

      setData(rData)
    },
    [client, setData, setError, setPending]
  )

  /**
   * add an expense
   */
  const addExpense = React.useCallback(
    async (expense, operation = 'set') => {
      setPending()
      const body = formatExpense(expense, operation)
      const {data: rData, error} = await client('mutate-data', {body})
      if (error) {
        setError(error)
        return
      }

      setData(rData)
    },
    [client, setData, setError, setPending]
  )

  /**
   * add a new movement
   */
  const addMovement = React.useCallback(
    async (movement, operation = null) => {
      const {monthly, payments} = data
      const body = getNewMovementBody(movement, monthly, payments, operation)
      setPending()
      const {data: rData, error} = await client('mutate-data', {body})
      if (error) {
        setError(error)
        return
      }

      setData(rData)
    },
    [client, data, setData, setError, setPending]
  )

  /**
   * Edit a movement
   */
  const editMovement = React.useCallback(
    async (oldMov, newMov) => {
      const {monthly} = data
      const body = getEditedMovementBody(oldMov, newMov, monthly)
      setPending()
      const {data: rData, error} = await client('mutate-data', {body})
      if (error) {
        setError(error)
        return
      }

      setData(rData)
    },
    [client, data, setData, setError, setPending]
  )

  /**
   * delete a doc by its id
   */
  const deleteDoc = React.useCallback(
    async (id, collection) => {
      const {movements, monthly, payments} = data
      const body = getDeletedBody(id, collection, movements, monthly, payments)
      if (!body.length) {
        setError({message: 'No se encontraron datos para eliminar'})
        return
      }
      setPending()
      const {error} = await client('mutate-data', {body})
      if (error) {
        setError(error)
        return
      }

      setData(
        // eslint-disable-next-line no-shadow
        body.map(({collection, operation, data}) => ({
          collection,
          operation,
          ...data,
        }))
      )
    },
    [client, data, setData, setError, setPending]
  )

  const value = React.useMemo(
    () => ({
      addCategory,
      addExpense,
      addMovement,
      editMovement,
      deleteDoc,
    }),
    [addCategory, addExpense, addMovement, editMovement, deleteDoc]
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
