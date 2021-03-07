const handler = async e => {
  const {user} = JSON.parse(e.body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      user_metadata: {
        'x-hasura-roles-allowed': ['admin'],
        'x-hasura-default-rol': 'user',
        'x-hasura-rol': user.rol,
      },
    }),
  }
}

module.exports = {handler}
