const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const getDate = date => (typeof date === 'string' ? new Date(date) : date)

const getMonthDates = dateParam => {
  const date = getDate(dateParam)
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfMonth = new Date(year, month, 1, 0, 0, 0)
  const lastOfMonth = new Date(year, month + 1, 0, 23, 59, 59)

  return {
    year: String(year),
    firstOfMonth: firstOfMonth.toISOString(),
    lastOfMonth: lastOfMonth.toISOString(),
  }
}

const getMovimientosQuery = (firstOfMonth, lastOfMonth) => ({
  query: q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('movimientos'))),
      q.Lambda(
        'ref',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(firstOfMonth)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(lastOfMonth)
          )
        )
      )
    ),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'movimientos',
})

const getMovimientosMensualesQuery = year => ({
  query: q.Map(
    q.Paginate(q.Match(q.Index('get_movimientos_mensuales_by_year'), year)),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'movimientosMensuales',
})

const getGastosCuotasQuery = lastOfMonth => ({
  query: q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('gastos_cuotas'))),
      q.Lambda(
        'ref',
        q.LTE(
          q.Time(lastOfMonth),
          q.Time(q.Select(['data', 'fechaUltimoPago'], q.Get(q.Var('ref'))))
        )
      )
    ),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'gastosCuotas',
})

const getCategoriasQuery = () => ({
  query: q.Map(
    q.Paginate(q.Documents(q.Collection('categorias'))),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'categorias',
})

const getOpcionesQuery = () => ({
  query: q.Map(
    q.Paginate(q.Documents(q.Collection('opciones'))),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'opciones',
})

const getGastosFijosQuery = () => ({
  query: q.Map(
    q.Paginate(q.Match(q.Index('get_fijo_activo'), false)),
    q.Lambda('ref', q.Get(q.Var('ref')))
  ),
  name: 'gastosFijos',
})

const getQueries = (dateISO, queryKeys) => {
  const {firstOfMonth, lastOfMonth, year} = getMonthDates(dateISO)
  const movimientosQuery = getMovimientosQuery(firstOfMonth, lastOfMonth)
  const movimientosMensualesQuery = getMovimientosMensualesQuery(year)
  const gastosCuotasQuery = getGastosCuotasQuery(lastOfMonth)
  const gastosFijosQuery = getGastosFijosQuery()
  const categoriasQuery = getCategoriasQuery()
  const opcionesQuery = getOpcionesQuery()

  return [
    movimientosMensualesQuery,
    gastosCuotasQuery,
    categoriasQuery,
    movimientosQuery,
    opcionesQuery,
    gastosFijosQuery,
  ]
    .filter(({name}) => queryKeys.includes(name))
    .reduce(
      (acc, {name, query}) => {
        acc.queries.push(client.query(query))
        acc.keys.push(name)

        return acc
      },
      {queries: [], keys: []}
    )
}

module.exports = {getQueries}
