const {getMovementsQueries} = require('../queries')

const keys = ['categorias']

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  try {
    const queries = getMovementsQueries()
    const result = await Promise.all(queries)

    const data = result.reduce((acc, r, i) => {
      const key = keys[i]
      acc[key] = r.data
      return acc
    }, {})

    return {
      statusCode: 200,
      body: JSON.stringify({...data, movimientos: []}),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
