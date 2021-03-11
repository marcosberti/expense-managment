const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const getMonthDates = date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const beginDate = new Date(year, month)
  const endDate = new Date(year, month + 1, 0, 23, 59, 59)
  return {beginDate: beginDate.toISOString(), endDate: endDate.toISOString()}
}

const getPromises = dateISO => {
  const date = new Date(dateISO)
  const {beginDate, endDate} = getMonthDates(date)

  const ingresosQuery = q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('ingresos'))),
      q.Lambda(
        'ingRef',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ingRef')))),
            q.Time(beginDate)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('ingRef')))),
            q.Time(endDate)
          )
        )
      )
    ),
    q.Lambda('ingRef', q.Select(['data'], q.Get(q.Var('ingRef'))))
  )

  const variablesQuery = q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('gastos_variables'))),
      q.Lambda(
        'varRef',
        q.And(
          q.GTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('varRef')))),
            q.Time(beginDate)
          ),
          q.LTE(
            q.Time(q.Select(['data', 'fecha'], q.Get(q.Var('varRef')))),
            q.Time(endDate)
          )
        )
      )
    ),
    q.Lambda('ingRef', q.Select(['data'], q.Get(q.Var('ingRef'))))
  )

  const cuotasQuery = q.Map(
    q.Filter(
      q.Paginate(q.Documents(q.Collection('gastos_cuotas'))),
      q.Lambda(
        'cuotRef',
        q.LTE(
          q.Time(
            q.Select(['data', 'fechaUltimoPago'], q.Get(q.Var('cuotRef')))
          ),
          q.Time(endDate)
        )
      )
    ),
    q.Lambda('cuotRef', q.Select(['data'], q.Get(q.Var('cuotRef'))))
  )

  const fijosQuery = q.Map(
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
  )

  return [ingresosQuery, variablesQuery, cuotasQuery, fijosQuery].map(query =>
    client.query(query)
  )
}

const keys = ['ingresos', 'variables', 'cuotas', 'fijos']

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
    const promises = getPromises(dateISO)
    const result = await Promise.all(promises)

    console.log('result', result)

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
