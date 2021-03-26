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

  if (monthly.method === 'POST') {
    queries.push(
      client.query(
        q.Create(q.Collection('movimientosMensuales'), {data: monthly.data})
      )
    )
  }
  if (monthly.method === 'PUT') {
    //   what?
  }

  if (gastoCuota) {
    //   what?
  }

  try {
    await Promise.all(queries)

    return {
      statusCode: 201,
      body: JSON.stringify({message: 'ok'}),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
