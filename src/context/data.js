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

const formatMovement = movement => {
  if (movement['tipo-egreso'] === 'fijo') {
    return {
      ...movement,
      fechaAlta: new Date().toISOString(),
    }
  }
  if (movement['tipo-egreso'] === 'cuotas') {
    const fecha = new Date(`${movement.fechaPrimerPago}T00:00:00`)
    const anio = fecha.getFullYear()
    const mes = fecha.getMonth()
    return {
      ...movement,
      montoCuota: movement.monto / movement.cuotas,
      fechaUltimoPago: new Date(
        anio,
        mes + Number(movement.cuotas),
        0,
        0,
        0,
        0
      ).toISOString(),
    }
  }

  return movement
}

const DataProvider = ({children}) => {
  const {isPending, isRejected, data, error, get, post} = useClient()
  const location = useLocation()
  const pageRef = React.useRef()

  React.useLayoutEffect(() => {
    const endpoint = location.state?.endpoint
    console.log('endpoint', endpoint)
    if (endpoint) {
      const params = getPathParams(endpoint, location.search)
      pageRef.current = location.pathname
      get(endpoint, {
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

  const addMovement = React.useCallback(movement => {
    const formatted = formatMovement(movement)
    console.log('mov', formatted)
  }, [])

  console.log('loc', location)

  const value = React.useMemo(
    () => ({
      ...data,
      addCategory,
      addMovement,
    }),
    [data, addCategory, addMovement]
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
