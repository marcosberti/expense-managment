import * as React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'

const DataContext = React.createContext()
DataContext.displayName = 'DataContext'

const paths = {
  '/': 'get-overview',
  '/movements': 'get-movements',
}

const getPathParams = (path, search) => {
  const date = new Date()
  if (path === paths['/']) {
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
  const {isPending, isRejected, error, data, run} = useClient()
  const location = useLocation()

  React.useEffect(() => {
    const path = paths[location.pathname]
    const params = getPathParams(path, location.search)
    run(path, {
      params,
    })
  }, [location, run])

  if (isPending) {
    return <div>pending</div>
  }

  if (isRejected) {
    return (
      <div>
        status {error.status} message {error.message}
      </div>
    )
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
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
