const handler = async (event, ctx) => {
  const {user} = ctx.clientContext
  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({data: []}),
  }
}

module.exports = {handler}
