import * as React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'

const DataContext = React.createContext()
DataContext.displayName = 'DataContext'

const getPathParams = (path, search) => {
  const date = new Date()
  if (path === 'get-overview') {
    return {
      dateISO: date.toISOString(),
    }
  }

  return (
    search || {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  )
}

const DataProvider = ({children}) => {
  const {isPending, isRejected, data, error, get, post} = useClient()
  const location = useLocation()
  const pageRef = React.useRef()

  React.useLayoutEffect(() => {
    const path = location.state?.endpoint
    if (path) {
      const params = getPathParams(path, location.search)
      pageRef.current = location.pathname
      get(path, {
        params,
      })
    }
  }, [location, get])

  const addCategory = React.useCallback(
    categoria => {
      post(
        'post-category',
        {
          params: categoria,
        },
        location.state.endpoint,
        prev => ({...prev, categorias: [...prev.categorias, categoria]})
      )
    },
    [location, post]
  )

  const value = React.useMemo(
    () => ({
      ...data,
      addCategory,
    }),
    [data, addCategory]
  )

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
