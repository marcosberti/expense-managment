const admin = require('firebase-admin')
const serviceAccount = require('./expense-manager-admin-sdk.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

module.exports = {db}
