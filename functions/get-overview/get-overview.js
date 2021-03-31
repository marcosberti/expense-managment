const {getKeyRef, getResponseData} = require('../utils')

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  let {
    queryStringParameters: {dateISO, keys},
  } = event

  keys = JSON.parse(keys)

  if (!dateISO) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'A date in ISO format is required',
      }),
    }
  }

  if (!keys.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'A keys array is required',
      }),
    }
  }

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  try {
    const queries = keys.map(key => {
      const ref = getKeyRef(key, dateISO)
      return ref.get()
    })

    const response = await Promise.all(queries)
    const result = getResponseData(keys, response)

    return {
      statusCode: 200,
      body: JSON.stringify({...result}),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
