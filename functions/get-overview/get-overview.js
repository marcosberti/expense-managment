const {getQueries} = require('../queries')

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  const {
    queryStringParameters: {dateISO, queryKeys},
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
    const {queries, keys} = getQueries(dateISO, queryKeys)
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
