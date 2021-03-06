const {db} = require('../firebase')

const handler = async (event, ctx) => {
  const {user} = ctx.clientContext

  if (!user || user.email !== process.env.EXPMAN_VALID_EMAIL) {
    return {
      statusCode: 401,
    }
  }

  let mutatedData = JSON.parse(event.body)

  try {
    const batch = db.batch()
    mutatedData = mutatedData.map(
      ({collection, operation, data: {id, ...data}}) => {
        const docRef = id
          ? db.collection(collection).doc(id)
          : db.collection(collection).doc()

        batch[operation](docRef, {...data})

        return {
          id: docRef.id,
          collection,
          ...data,
        }
      }
    )

    await batch.commit()

    return {
      statusCode: 201,
      body: JSON.stringify(mutatedData),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: e.toString()}),
    }
  }
}

module.exports = {handler}
