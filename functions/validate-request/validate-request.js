const handler = async (e, ctx) => {
  const {user} = ctx.clientContext
  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        'X-Hasura-Roles-Allowed': JSON.stringify(['admin']),
        'X-Hasura-Default-Role': 'user',
        'X-Hasura-Role': user.app_metadata.roles[0].toLowerCase(),
      }),
    }
  }

  console.log('user', user)
  console.log('ctx', ctx.clientContext)

  return {
    statusCode: 401,
    body: `user ${user}`,
  }
}

module.exports = {handler}
