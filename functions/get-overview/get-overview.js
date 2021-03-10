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

  console.log('beg', beginDate)
  console.log('end', endDate)

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

  //   return client.query(ingresosQuery)
}

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  const {
    queryStringParameters: {date: dateISO},
  } = event

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  const promises = getPromises(dateISO)

  try {
    const result = await Promise.all(promises)
    console.log(result)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}

module.exports = {handler}
