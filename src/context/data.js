import * as React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'
import {getMonthDates, formatDateToISO} from 'common-utils'

const DataContext = React.createContext()
DataContext.displayName = 'DataContext'

const DEFAULT_ENDPOINT = 'get-overview'
const STATUS_PENDING = 'pending'
const STATUS_REJECTED = 'rejected'
const STATUS_RESOLVED = 'resolved'
const STATUS_UPDATED = 'updated'
const STATUS_STORAGE = 'storage'
const STATUS_ADDED = 'added'
const STORAGE_KEY = 'expman-data'

const endpointKeys = {
  'get-overview': ['monthly', 'payments', 'categories'],
  'get-movements': [
    'movements',
    'monthly',
    'categories',
    'options',
    'payments',
    'fixed',
  ],
}

const getEndpointParams = (endpoint, keys, search) => {
  const date = search ? new Date(`${search.split('=')[1]}-10`) : new Date()
  const missingKeys = endpointKeys[endpoint].filter(k => !keys.includes(k))

  return {
    dateISO: date.toISOString(),
    keys: missingKeys,
  }
}
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
  if (expense.tipo === 'fijo') {
    const {fechaActivo, fechaInactivo, monto, tipo, ...rest} = expense
    return {
      data: {
        ...rest,
        montos: [
          {
            fechaActivo: formatDateToISO(fechaActivo),
            fechaInactivo: false,
            monto: Number(monto),
          },
        ],
      },
      tipo,
    }
  }
  if (expense.tipo === 'cuotas') {
    const {tipo, ...rest} = expense
    rest.fechaPrimerPago = formatDateToISO(rest.fechaPrimerPago)
    rest.cuotas = Number(rest.cuotas)
    rest.monto = Number(rest.monto)

    const {lastOfMonth, month, year} = getMonthDates(
      new Date(rest.fechaPrimerPago)
    )

    const mesUltimoPago = month + rest.cuotas - 1
    const fechaUltimoPago = new Date(
      year,
      mesUltimoPago,
      lastOfMonth.getDate(),
      0,
      0,
      0
    ).toISOString()

    return {
      data: {
        ...rest,
        fechaUltimoPago,
        montoCuota: rest.monto / rest.cuotas,
        pagos: new Array(rest.cuotas).fill(false),
      },
      tipo,
    }
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
  const body = {
    movement: formattedMovement,
    monthly: formattedMonthly,
  }

  if (movement.spentType === 'cuotas') {
    body.payments = payments.find(
      ({details}) => details === movement.expenseRef
    )
    const index = body.payments.payments.indexOf(false)
    body.payments.paids[index] = true
  }

  return body
}

const getFromStorage = path => JSON.parse(localStorage.getItem(path))

const saveToStorage = (path, data) =>
  localStorage.setItem(path, JSON.stringify(data))

const reducer = (state, action) => {
  if (action.type === STATUS_PENDING) {
    return {
      status: STATUS_PENDING,
      data: state.data,
    }
  }
  if (action.type === STATUS_REJECTED) {
    return {
      status: STATUS_REJECTED,
      error: action.error,
    }
  }
  if (action.type === STATUS_STORAGE) {
    const sData = getFromStorage(STORAGE_KEY)
    const data = {...state.data, ...sData}
    return {
      status: STATUS_RESOLVED,
      data,
    }
  }
  if (action.type === STATUS_UPDATED) {
    const keys = Object.keys(action.data)
    const updatedData = keys.reduce((sData, key) => {
      const data = action.data[key]
      const sDataKey = sData[key] ?? []

      /**
       * if it's not an array, we return w/o spreding
       */
      if (!Array.isArray(data)) {
        return {
          ...sData,
          [key]: data,
        }
      }

      return {
        ...sData,
        [key]: [...sDataKey, ...data],
      }
    }, state.data)

    saveToStorage(STORAGE_KEY, updatedData)
    return {
      status: STATUS_RESOLVED,
      data: updatedData,
    }
  }
  if (action.type === STATUS_ADDED) {
    const updatedData = {
      ...state.data,
    }
    if (action.key) {
      updatedData[action.key] = [...state.data[action.key], action.value]
    }
    if (action.values) {
      action.values.forEach(({data, ref, key}) => {
        if (key === 'movimientos') {
          updatedData.movimientos.push({ref, ...data})
        }
        if (key === 'movimientosMensuales') {
          let movimientoMensual = updatedData.movimientosMensuales.find(
            m => m.mes === data.mes
          )
          if (!movimientoMensual) {
            movimientoMensual = {
              anio: data.anio,
              mes: data.mes,
              ingreso: 0,
              egreso: 0,
              ref,
            }
            updatedData.movimientosMensuales.push(movimientoMensual)
          }
          movimientoMensual.ingreso =
            movimientoMensual.ingreso === data.ingreso
              ? data.ingreso
              : movimientoMensual.ingreso + data.ingreso
          movimientoMensual.egreso =
            movimientoMensual.egreso === data.egreso
              ? data.egreso
              : movimientoMensual.egreso + data.egreso
        }
        if (key === 'gastosCuotas') {
          const index = updatedData.gastosCuotas.indexOf(
            g => g.detalle === data.detalle
          )
          updatedData.gastosCuotas[index] = data
        }
      })
    }

    saveToStorage(STORAGE_KEY, updatedData)

    return {
      status: STATUS_RESOLVED,
      data: updatedData,
    }
  }

  throw new Error('Unhandled action')
}

const initialState = {
  status: STATUS_PENDING,
  data: {},
}

const DataProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const client = useClient()
  const location = useLocation()
  const pageRef = React.useRef()
  /**
   * keysRef will hold the keys that must be fechtched and return
   * if an endpoint already requested the key "a" there is no need
   * to do that again
   */
  const keysRef = React.useRef()

  const {data, status, error} = state

  React.useEffect(() => {
    keysRef.current = data ? Object.keys(data) : null
  }, [data])

  /**
   * Fetch data for every route
   */
  React.useEffect(() => {
    const endpoint = location.state?.endpoint ?? DEFAULT_ENDPOINT
    pageRef.current = `${location.pathname}${location.search}`
    /**
     * check if the endpoint was already requested
     * if so, get the data from storage
     */
    const inStorage = getFromStorage(pageRef.current)
    if (inStorage) {
      dispatch({type: STATUS_STORAGE})
      return
    }

    const run = async () => {
      const params = getEndpointParams(
        endpoint,
        keysRef.current,
        location.search
      )
      console.log('params', params)
      dispatch({type: STATUS_PENDING})
      const response = await client(endpoint, {params})
      if (response.error) {
        dispatch({type: STATUS_REJECTED, error: response.error})
        return
      }

      saveToStorage(pageRef.current, true)
      dispatch({type: STATUS_UPDATED, data: response.data})
    }

    run()
  }, [location, client])

  /**
   * Add a new category
   */
  const addCategory = React.useCallback(
    async categoria => {
      console.log('cat', categoria)
      // dispatch({type: STATUS_PENDING})
      // const response = await client('post-category', {body: categoria})
      // if (response.error) {
      //   dispatch({type: STATUS_REJECTED, error: response.error})
      //   return
      // }

      // const {
      //   // eslint-disable-next-line no-shadow
      //   data: {ref, data},
      // } = response

      // dispatch({type: STATUS_ADDED, key: 'categorias', value: {ref, ...data}})
    },
    [client]
  )

  /**
   * Add a new expense
   */
  const addExpense = React.useCallback(
    async gasto => {
      console.log('gasto', gasto)
      // dispatch({type: STATUS_PENDING})
      // const expense = formatExpense(gasto)
      // const response = await client('post-expense', {body: expense})
      // if (response.error) {
      //   dispatch({type: STATUS_REJECTED, error: response.error})
      //   return
      // }

      // const {
      //   // eslint-disable-next-line no-shadow
      //   data: {ref, data},
      // } = response

      // const key = expense.tipo === 'cuotas' ? 'gastosCuotas' : 'gastosFijos'
      // dispatch({type: STATUS_ADDED, key, value: {ref, ...data}})
    },
    [client]
  )

  /**
   * Add a new movement
   */
  const addMovement = React.useCallback(
    async movement => {
      const {monthly, payments} = data
      const body = getMovementBody(movement, monthly, payments)
      console.log('mov', body)
      // dispatch({type: STATUS_PENDING})
      // const response = await client('post-movement', {body})
      // if (response.error) {
      //   dispatch({type: STATUS_REJECTED, error: response.error})
      //   return
      // }

      // dispatch({type: STATUS_ADDED, values: response.data})
    },
    [client, data]
  )

  /**
   * Memoize the values
   */
  const value = React.useMemo(
    () => ({
      ...data,
      addCategory,
      addMovement,
      addExpense,
    }),
    [data, addCategory, addMovement, addExpense]
  )

  console.log('data', data)

  const isPending = status === STATUS_PENDING
  const isRejected = status === STATUS_REJECTED

  if (
    isPending ||
    !pageRef.current ||
    pageRef.current !== `${location.pathname}${location.search}`
  ) {
    return <div>pending</div>
  }

  if (isRejected) {
    return (
      <div>
        status {error.status} message {error.message}
      </div>
    )
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

const useData = () => {
  const context = React.useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export {DataProvider, useData}
