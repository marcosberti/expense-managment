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
  '/expenses': ['fixed', 'payments'],
}

const getPathnameParams = (pathname, keys, search) => {
  const date = search ? new Date(`${search.split('=')[1]}-10`) : new Date()
  const missingKeys = pathsKeys[pathname].filter(k => !keys.includes(k))

  if (!missingKeys.length && search) {
    missingKeys.push('movements')
  }

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
    action.values.forEach(({collection, operation, ...data}) => {
      const index = updatedData[collection].findIndex(c => c.id === data.id)
      if (operation === 'delete') {
        updatedData[collection].splice(index, 1)
      } else if (index >= 0) {
        updatedData[collection][index] = data
      } else {
        updatedData[collection].push(data)
      }
    })

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
      if (!params.keys.length) {
        saveToStorage(pageRef.current, true)
        dispatch({type: STATUS_STORAGE})
        return
      }

      dispatch({type: STATUS_PENDING})
      const {data: rData, error} = await client('get-data', {params})
      if (error) {
        dispatch({type: STATUS_REJECTED, error})
        return
      }

      saveToStorage(pageRef.current, true)
      dispatch({type: STATUS_UPDATED, data: rData})
    }

    run()
  }, [location, client])

  /**
   * Set pending status
   */
  const setPending = React.useCallback(
    () => dispatch({type: STATUS_PENDING}),
    []
  )

  /**
   * Set error
   */
  const setError = React.useCallback(
    error => dispatch({type: STATUS_REJECTED, error}),
    []
  )

  /**
   * Update data
   */
  const setData = React.useCallback(
    values => dispatch({type: STATUS_ADDED, values}),
    []
  )

  /**
   * Memoize the values
   */
  const value = React.useMemo(
    () => ({
      ...data,
      setPending,
      setError,
      setData,
    }),
    [data, setData, setError, setPending]
  )

  // console.log('data', data)

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
