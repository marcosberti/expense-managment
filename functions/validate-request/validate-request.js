const handler = async e => {
  const {user} = JSON.parse(e.body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      'X-Hasura-Roles-Allowed': ['admin'],
      'X-Hasura-Default-Role': 'user',
      'X-Hasura-Role': user.app_metadata?.roles[0] ?? 'user',
    }),
  }
}

module.exports = {handler}
