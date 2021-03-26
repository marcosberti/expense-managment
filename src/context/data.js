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
const STORAGE_KEY = 'expman-data'

const endpointKeys = {
  'get-overview': ['movimientosMensuales', 'gastosCuotas', 'categorias'],
  'get-movements': [
    'movimientos',
    'categorias',
    'opciones',
    'gastosCuotas',
    'gastosFijos',
  ],
}

const getEndpointParams = (endpoint, search, keys) => {
  const dateISO = new Date().toISOString()
  const queryKeys = keys
    ? endpointKeys[endpoint].filter(k => !keys.includes(k))
    : endpointKeys[endpoint]

  return {
    dateISO,
    queryKeys,
  }
}

const formatMovement = movement => ({
  ...movement,
  monto: Number(movement.monto),
  fecha: formatDateToISO(movement.fecha),
})

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

const formatMonthly = (movimientosMensuales, movimiento) => {
  const [anio, mes] = movimiento.fecha.split('-')
  let method = 'PUT'
  let data = movimientosMensuales.find(g => g.anio === anio && g.mes === mes)
  if (!data) {
    method = 'POST'
    data = {
      anio,
      mes,
      ingreso: 0,
      egreso: 0,
    }
  }
  const monto = movimiento.tipoCambio
    ? movimiento.tipoCambio * movimiento.monto
    : movimiento.monto
  data[movimiento.tipo] += monto
  return {data, method}
}

const getMovementBody = (movimiento, movimientosMensuales, gastosCuotas) => {
  const movement = formatMovement(movimiento)
  const monthly = formatMonthly(movimientosMensuales, movement)
  const body = {
    movement,
    monthly,
  }

  if (movimiento.tipoEgreso === 'cuotas') {
    body.gastoCuota = gastosCuotas.find(g => g.detalle === movement.gastoRef)
    const index = body.gastoCuota.pagos.indexOf(false)
    body.gastoCuota.pagos[index] = movement.fecha
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
  if (action.type === STATUS_RESOLVED) {
    const data = {...state.data, ...action.data}
    saveToStorage(STORAGE_KEY, data)
    return {
      status: STATUS_RESOLVED,
      data,
    }
  }

  if (action.type === STATUS_UPDATED) {
    const data = {
      ...state.data,
      // [action.key]: [...state.data[action.key], action.value],
    }
    if (action.key) {
      data[action.key] = [...state.data[action.key], action.value]
    }
    if (action.values) {
      const {movement, monthly, gastoCuota} = action.values

      data.movimientos.push(movement)

      let movimientoMensual = data.movimientosMensuales.find(
        m => m.mes === monthly.data.mes
      )
      if (!movimientoMensual) {
        movimientoMensual = {
          anio: monthly.data.anio,
          mes: monthly.data.mes,
        }
        data.movimientosMensuales.push(movimientoMensual)
      }
      movimientoMensual.ingreso = monthly.data.ingreso
      movimientoMensual.egreso = monthly.data.egreso

      if (gastoCuota) {
        const index = data.gastosCuotas.indexOf(
          g => g.detalle === gastoCuota.detalle
        )
        data.gastosCuotas[index] = gastoCuota
      }
    }

    saveToStorage(STORAGE_KEY, data)

    return {
      status: STATUS_RESOLVED,
      data,
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
    pageRef.current = location.pathname
    /**
     * check if the endpoint was already requested
     * if so, get the data from storage
     */
    const inStorage = getFromStorage(endpoint)
    if (inStorage) {
      const storageData = getFromStorage(STORAGE_KEY)
      dispatch({type: STATUS_RESOLVED, data: storageData})
      return
    }

    const run = async () => {
      const params = getEndpointParams(
        endpoint,
        location.search,
        keysRef.current
      )
      dispatch({type: STATUS_PENDING})
      const response = await client(endpoint, {params})
      if (response.error) {
        dispatch({type: STATUS_REJECTED, error: response.error})
        return
      }

      saveToStorage(endpoint, true)
      dispatch({type: STATUS_RESOLVED, data: response.data})
      pageRef.current = location.pathname
    }

    run()
  }, [location, client])

  /**
   * Add a new category
   */
  const addCategory = React.useCallback(
    async categoria => {
      dispatch({type: STATUS_PENDING})
      const {error} = await client('post-category', {body: categoria})
      if (error) {
        dispatch({type: STATUS_REJECTED, error})
        return
      }

      dispatch({type: STATUS_UPDATED, key: 'categorias', value: categoria})
    },
    [client]
  )

  console.log('data', status, data)

  /**
   * Add a new expense
   */
  const addExpense = React.useCallback(
    async gasto => {
      dispatch({type: STATUS_PENDING})
      const expense = formatExpense(gasto)
      const {error} = await client('post-expense', {body: expense})
      if (error) {
        dispatch({type: STATUS_REJECTED, error})
        return
      }

      const key = expense.tipo === 'cuotas' ? 'gastosCuotas' : 'gastosFijos'
      dispatch({type: STATUS_UPDATED, key, value: expense})
    },
    [client]
  )

  /**
   * Add a new movement
   */
  const addMovement = React.useCallback(
    async movimiento => {
      const {movimientosMensuales, gastosCuotas} = data
      const body = getMovementBody(
        movimiento,
        movimientosMensuales,
        gastosCuotas
      )
      // console.log('body', body)
      // dispatch({type: STATUS_PENDING})
      // const {error} = await client('post-movement', {body})
      // if (error) {
      //   dispatch({type: STATUS_REJECTED, error})
      //   return
      // }

      dispatch({type: STATUS_UPDATED, values: body})
    },
    [data]
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

  const isPending = status === STATUS_PENDING
  const isRejected = status === STATUS_REJECTED

  if (isPending || !pageRef.current || pageRef.current !== location.pathname) {
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
