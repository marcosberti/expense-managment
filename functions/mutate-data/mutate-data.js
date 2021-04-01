const {db} = require('../firebase')

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  let {data} = JSON.parse(event.body)

  try {
    const batch = db.batch()
    data = data.map(({collection, data: {id, ...mutated}}) => {
      const docRef = id
        ? db.collection(collection).doc(id)
        : db.collection(collection).doc()

      const operation = id ? 'update' : 'set'
      batch[operation](docRef, {...mutated})

      return {
        id: docRef.id,
        ...mutated,
      }
    })

    await batch.commit()

    return {
      statusCode: 201,
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
