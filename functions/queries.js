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
  const firstOfYear = new Date(year, 0, 1, 0, 0, 0)
  const lastOfYear = new Date(year, 11, 31, 23, 59, 59)
  const lastOfMonth = new Date(year, month + 1, 0, 23, 59, 59)

  return {
    year: String(year),
    firstOfYear: firstOfYear.toISOString(),
    lastOfYear: lastOfYear.toISOString(),
    lastOfMonth: lastOfMonth.toISOString(),
  }
}

const getIngresosQuery = (firstOfYear, lastOfYear) => ({
  query: q.Map(
    q.Filter(
      q.Paginate(q.Match(q.Index('get_movimientos_by_type'), 'ingreso')),
      q.Lambda(
        'ref',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(firstOfYear)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(lastOfYear)
          )
        )
      )
    ),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'ingresos',
})

const getMovimientosQuery = (firstOfYear, lastOfYear) => ({
  query: q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('movimientos'))),
      q.Lambda(
        'ref',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(firstOfYear)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ref')))),
            q.Time(lastOfYear)
          )
        )
      )
    ),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'movimientos',
})

const getGastosMensualQuery = year => ({
  query: q.Map(
    q.Paginate(q.Match(q.Index('get_gastos_mensual_by_year'), year)),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'gastosMensual',
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
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'gastosCuotas',
})

const getCategoriasQuery = () => ({
  query: q.Map(
    q.Paginate(q.Documents(q.Collection('categorias'))),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'categorias',
})

const getOpcionesQuery = () => ({
  query: q.Map(
    q.Paginate(q.Documents(q.Collection('opciones'))),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  ),
  name: 'opciones',
})

const getGastosFijosQuery = () => ({
  query: q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('gastos_fijos'))),
      q.Lambda(
        'fijRef',
        q.IsNull(
          q.Select(['data', 'montos', 'fechaInactivo'], q.Get(q.Var('fijRef')))
        )
      )
    ),
    q.Lambda('fijRef', q.Select(['data'], q.Get(q.Var('fijRef'))))
  ),
  name: 'gastosFijos',
})

const getQueries = (dateISO, queryKeys) => {
  const {year, firstOfYear, lastOfYear, lastOfMonth} = getMonthDates(dateISO)
  const ingresosQuery = getIngresosQuery(firstOfYear, lastOfYear)
  const gastosMensualQuery = getGastosMensualQuery(year)
  const gastosCuotasQuery = getGastosCuotasQuery(lastOfMonth)
  const categoriasQuery = getCategoriasQuery()
  const movimientosQuery = getMovimientosQuery(firstOfYear, lastOfYear)
  const opcionesQuery = getOpcionesQuery()
  const gastosFijosQuery = getGastosFijosQuery()

  return [
    ingresosQuery,
    gastosMensualQuery,
    gastosCuotasQuery,
    categoriasQuery,
    movimientosQuery,
    opcionesQuery,
    gastosFijosQuery,
  ]
    .filter(({name}) => queryKeys.includes(name))
    .map(({query}) => client.query(query))
}

module.exports = {getQueries}
