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

const getQueries = dateISO => {
  const date = new Date(dateISO)
  const {year, firstOfYear, lastOfYear, lastOfMonth} = getMonthDates(date)

  const ingresosQuery = q.Map(
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

  const gastosQuery = q.Map(
    q.Paginate(q.Match(q.Index('get_gastos_mensual_by_year'), year.toString())),
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

  const cuotasQuery = q.Map(
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

  return [ingresosQuery, gastosQuery, cuotasQuery].map(query =>
    client.query(query)
  )
}

const keys = ['ingresos', 'gastos', 'cuotas']

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  const {
    queryStringParameters: {dateISO},
  } = event

  if (!dateISO) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: 'A date in ISO format is required'}),
    }
  }

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  try {
    const queries = getQueries(dateISO)
    const result = await Promise.all(queries)

    const data = result.reduce((acc, r, i) => {
      const key = keys[i]
      acc[key] = r.data
      return acc
    }, {})
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
