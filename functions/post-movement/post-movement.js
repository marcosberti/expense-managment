const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  const {movement, monthly, gastoCuota} = JSON.parse(event.body)
  const queries = []

  queries.push(
    client.query(q.Create(q.Collection('movimientos'), {data: movement}))
  )

  const {ref: monthlyRef, ...monthlyData} = monthly
  if (monthlyRef) {
    queries.push(
      client.query(
        q.Update(
          q.Ref(q.Collection('movimientos_mensuales'), monthlyRef['@ref'].id),
          {data: monthlyData}
        )
      )
    )
  } else {
    queries.push(
      client.query(
        q.Create(q.Collection('movimientos_mensuales'), {data: monthlyData})
      )
    )
  }

  if (gastoCuota) {
    const {ref, ...data} = gastoCuota
    queries.push(
      client.query(
        q.Update(q.Ref(q.Collection('gastos_cuotas'), ref['@ref'].id), {data})
      )
    )
  }

  try {
    const response = await Promise.all(queries)

    return {
      statusCode: 201,
      body: JSON.stringify(
        response.map((r, i) => ({
          ...r,
          key:
            // eslint-disable-next-line no-nested-ternary
            i === 0
              ? 'movimientos'
              : i === 1
              ? 'movimientosMensuales'
              : 'gastosCuotas',
        }))
      ),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
