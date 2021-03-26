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

  const {data, tipo} = JSON.parse(event.body)

  try {
    const collection = tipo === 'fijo' ? 'gastos_fijos' : 'gastos_cuotas'
    await client.query(q.Create(q.Collection(collection), {data}))

    return {
      statusCode: 201,
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
