const handler = async (e, ctx) => {
  const {user} = ctx.clientContext
  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        'X-Hasura-Roles-Allowed': ['admin'],
        'X-Hasura-Default-Role': 'user',
        'X-Hasura-Role': user.app_metadata.roles[0],
      }),
    }
  }

  return {
    statusCode: 401,
  }
}

module.exports = {handler}
