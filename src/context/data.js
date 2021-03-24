import * as React from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useClient} from 'hooks'
import {getMonthDates, formatDateToISO} from 'common-utils'

const DataContext = React.createContext()
DataContext.displayName = 'DataContext'

const endpointKeys = {
  'get-overview': ['gastosMensual', 'gastosCuotas', 'ingresos', 'categorias'],
  'get-movements': [
    'movimientos',
    'categorias',
    'opciones',
    'gastosCuotas',
    'gastosFijos',
  ],
}

const getEndpointParams = (endpoint, search, keys) => {
  const date = new Date()
  return {
    dateISO: date.toISOString(),
    queryKeys: endpointKeys[endpoint].filter(k => !keys.includes(k)),
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
            fechaInactivo: null,
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

    let mesUltimoPago = month + rest.cuotas
    mesUltimoPago = mesUltimoPago < 10 ? `0${mesUltimoPago}` : mesUltimoPago

    return {
      data: {
        ...rest,
        fechaUltimoPago: formatDateToISO(
          `${year}-${mesUltimoPago}-${lastOfMonth.getDate()}`
        ),
        montoCuota: rest.monto / rest.cuotas,
        pagos: new Array(rest.cuotas).fill(false),
      },
      tipo,
    }
  }

  throw new Error('Unhandled expense type')
}

const formatMonthly = (gastosMensual, movimiento) => {
  // if (movimiento['tipo-egreso'] === 'variable') {
  //   const [anio, mes] = movimiento.fecha.split('-')
  //   let gasto = gastosMensual.find(g => g.anio === anio && g.mes === mes)
  //   if (!gasto) {
  //     gasto = {
  //       anio,
  //       mes,
  //       monto: 0,
  //       moneda: movimiento.moneda,
  //     }
  //     gastosMensual.push(gasto)
  //   }
  //   g.monto += movimiento.monto
  // }
  // if (movimiento['tipo-egreso'] === 'fijo') {
  // }
  // if (movimiento['tipo-egreso'] === 'cuotas') {
  // }
  // console.error('y calcuñar y actualizar el valor de gasto mensual')
  // console.error(
  //   'para los gastos fijos y en cuotas, ese valor se calcula al dar de alta alguno de estos movimientos? o en el primero mov var del mes, si es inicial se calcula y actualiza en ese momento????'
  // )
}

const DEFAULT_ENDPOINT = 'get-overview'

const DataProvider = ({children}) => {
  const {isPending, isRejected, data, error, get, post} = useClient()
  const location = useLocation()
  const pageRef = React.useRef()
  const keysRef = React.useRef(Object.keys(data))

  React.useLayoutEffect(() => {
    const endpoint = location.state?.endpoint ?? DEFAULT_ENDPOINT
    const params = getEndpointParams(endpoint, location.search, keysRef.current)
    get(endpoint, {
      params,
    })
    pageRef.current = location.pathname
  }, [location, get])

  React.useEffect(() => {
    keysRef.current = Object.keys(data)
  }, [data])

  const addCategory = React.useCallback(
    categoria => {
      post('post-category', {params: categoria}, 'categorias')
    },
    [post]
  )

  console.log('data', data)

  const addExpense = React.useCallback(
    gasto => {
      const expense = formatExpense(gasto)
      const key = expense.tipo === 'cuotas' ? 'gastosCuotas' : 'gastosFijos'
      post('post-expense', {params: expense}, key)
    },
    [post]
  )

  const addMovement = React.useCallback(movimiento => {
    const movement = formatMovement(movimiento)
    // const men = formatMonthly(data.gastosMensual, mov)
    console.log('mov', movement)
    // console.error(
    //   `en coleccion gastosvarialbes agregar campo "tipo" ("variable" o "pago"),
    //    si es "pago" se guarda ref a que gasto("fijo" o "cuota"),
    //    no la ref en si pero un obj con los datos`
    // )
    // console.error(
    //   'post debe recibir un array de arrays o una simple, como en addCategory'
    // )
    // post([
    //   ['post-movement', {params: formatMovement(movimiento)}, 'movimientos'],
    //   [
    //     'post-monthly', // or PUT? ?????
    //     {params: formatMonthly(data.gastosMensual, movimiento)},
    //     'gastosMensual',
    //   ],
    // ])
  }, [])

  const value = React.useMemo(
    () => ({
      ...data,
      addCategory,
      addMovement,
      addExpense,
    }),
    [data, addCategory, addMovement, addExpense]
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
