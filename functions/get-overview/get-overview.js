const {getOverviewQueries} = require('../queries')

const keys = ['ingresos', 'gastos', 'cuotas', 'categorias']

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
    const queries = getOverviewQueries(dateISO)
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
