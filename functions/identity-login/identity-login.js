const handler = async e => {
  const {user} = JSON.parse(e.body)
  return {
    statusCode: 200,
    body: JSON.stringify({
      user_metadata: {
        ...user.user_metadata,
        'x-hasura-roles-allowed': ['admin'],
        'x-hasura-default-rol': 'user',
        'x-hasura-rol': user.app_metadata.roles[0],
      },
    }),
  }
}

module.exports = {handler}
