const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const getMonthDates = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfYear = new Date(year, 0)
  const lastOfYear = new Date(year, 11, 31, 23, 59, 59)
  const lastOfMonth = new Date(year, month + 1, 0, 23, 59, 59)
  return {
    year,
    firstOfYear: firstOfYear.toISOString(),
    lastOfYear: lastOfYear.toISOString(),
    lastOfMonth: lastOfMonth.toISOString(),
  }
}

const getIngresosQuery = (firstOfYear, lastOfYear) =>
  q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('ingresos'))),
      q.Lambda(
        'ingRef',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ingRef')))),
            q.Time(firstOfYear)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ingRef')))),
            q.Time(lastOfYear)
          )
        )
      )
    ),
    q.Lambda('ingRef', q.Select(['data'], q.Get(q.Var('ingRef'))))
  )

const getGastosQuery = year =>
  q.Map(
    q.Paginate(q.Match(q.Index('get_gastos_mensual_by_year'), year)),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  )

const getCuotasQuery = lastOfMonth =>
  q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('gastos_cuotas'))),
      q.Lambda(
        'cuotRef',
        q.LTE(
          q.Time(lastOfMonth),
          q.Time(q.Select(['data', 'fechaUltimoPago'], q.Get(q.Var('cuotRef'))))
        )
      )
    ),
    q.Lambda('cuotRef', q.Select(['data'], q.Get(q.Var('cuotRef'))))
  )

const getCategoriasQuery = () =>
  q.Map(
    q.Paginate(q.Documents(q.Collection('categorias'))),
    q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
  )

// const variablesQuery = q.Map(
//   q.Filter(
//     q.Paginate(q.Documents(q.Collection('gastos_variables'))),
//     q.Lambda(
//       'varRef',
//       q.And(
//         q.GTE(
//           q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('varRef')))),
//           q.Time(beginDate)
//         ),
//         q.LTE(
//           q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('varRef')))),
//           q.Time(endDate)
//         )
//       )
//     )
//   ),
//   q.Lambda('ingRef', q.Select(['data'], q.Get(q.Var('ingRef'))))
// )

// const fijosQuery = q.Map(
//   q.Filter(
//     q.Paginate(q.Documents(q.Collection('gastos_fijos'))),
//     q.Lambda(
//       'fijRef',
//       q.IsNull(
//         q.Select(['data', 'montos', 'fechaInactivo'], q.Get(q.Var('fijRef')))
//       )
//     )
//   ),
//   q.Lambda('fijRef', q.Select(['data'], q.Get(q.Var('fijRef'))))
// )

const getOverviewQueries = dateISO => {
  const date = new Date(dateISO)
  const {year, firstOfYear, lastOfYear, lastOfMonth} = getMonthDates(date)
  const ingresosQuery = getIngresosQuery(firstOfYear, lastOfYear)
  const gastosQuery = getGastosQuery(String(year))
  const cuotasQuery = getCuotasQuery(lastOfMonth)
  const categoriasQuery = getCategoriasQuery()

  return [ingresosQuery, gastosQuery, cuotasQuery, categoriasQuery].map(query =>
    client.query(query)
  )
}

const getMovementsQueries = () => {
  const categoriasQuery = getCategoriasQuery()

  return [categoriasQuery].map(query => client.query(query))
}

module.exports = {getOverviewQueries, getMovementsQueries}
