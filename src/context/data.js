import * as React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'

const DataContext = React.createContext()
DataContext.displayName = 'DataContext'

const STATUS_PENDING = 'pending'
const STATUS_REJECTED = 'rejected'
const STATUS_RESOLVED = 'resolved'
const STATUS_UPDATED = 'updated'
const STATUS_STORAGE = 'storage'
const STATUS_ADDED = 'added'
const STORAGE_KEY = 'expman-data'

const pathsKeys = {
  '/': ['monthly', 'payments', 'categories'],
  '/movements': [
    'movements',
    'monthly',
    'categories',
    'options',
    'payments',
    'fixed',
  ],
}

const getPathnameParams = (pathname, keys, search) => {
  const date = search ? new Date(`${search.split('=')[1]}-10`) : new Date()
  const missingKeys = pathsKeys[pathname].filter(k => !keys.includes(k))

  return {
    dateISO: date.toISOString(),
    keys: missingKeys,
  }
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
      throw Error('mirar esto')
      // en vez de key, hacer Object.keys(actions.values)
      // action.values.forEach(({data, ref, key}) => {
      //   if (key === 'movimientos') {
      //     updatedData.movimientos.push({ref, ...data})
      //   }
      //   if (key === 'movimientosMensuales') {
      //     let movimientoMensual = updatedData.movimientosMensuales.find(
      //       m => m.mes === data.mes
      //     )
      //     if (!movimientoMensual) {
      //       movimientoMensual = {
      //         anio: data.anio,
      //         mes: data.mes,
      //         ingreso: 0,
      //         egreso: 0,
      //         ref,
      //       }
      //       updatedData.movimientosMensuales.push(movimientoMensual)
      //     }
      //     movimientoMensual.ingreso =
      //       movimientoMensual.ingreso === data.ingreso
      //         ? data.ingreso
      //         : movimientoMensual.ingreso + data.ingreso
      //     movimientoMensual.egreso =
      //       movimientoMensual.egreso === data.egreso
      //         ? data.egreso
      //         : movimientoMensual.egreso + data.egreso
      //   }
      //   if (key === 'gastosCuotas') {
      //     const index = updatedData.gastosCuotas.indexOf(
      //       g => g.detalle === data.detalle
      //     )
      //     updatedData.gastosCuotas[index] = data
      //   }
      // })
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
    pageRef.current = `${location.pathname}${location.search}`
    /**
     * check if that page was already requested
     * if so, get the data from storage
     */
    const inStorage = getFromStorage(pageRef.current)
    if (inStorage) {
      dispatch({type: STATUS_STORAGE})
      return
    }

    const run = async () => {
      const params = getPathnameParams(
        location.pathname,
        keysRef.current,
        location.search
      )
      console.log('params', params)
      dispatch({type: STATUS_PENDING})

      // eslint-disable-next-line no-shadow
      const {data, error} = await client('get-data', {params})
      if (error) {
        dispatch({type: STATUS_REJECTED, error})
        return
      }

      saveToStorage(pageRef.current, true)
      dispatch({type: STATUS_UPDATED, data})
    }

    run()
  }, [location, client])

  /**
   * Memoize the values
   */
  const value = React.useMemo(
    () => ({
      ...data,
    }),
    [data]
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
