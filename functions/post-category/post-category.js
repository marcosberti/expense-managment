const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
})

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext

  const category = JSON.parse(event.body)

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  try {
    await client.query(q.Create(q.Collection('categorias'), {data: category}))

    return {
      statusCode: 200,
      body: JSON.stringify(category),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
