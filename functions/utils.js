const {db} = require('./firebase')

const sorted = {
  categories: 'name',
  payments: 'details',
  fixed: 'details',
  movements: 'date',
}

const sortedInverted = {
  date: true,
}

const getResponseData = (queriedkeys, response) => {
  const result = response.reduce((r, snapshot, i) => {
    const data = []
    snapshot.forEach(snap => {
      data.push({
        id: snap.id,
        ...snap.data(),
      })
    })
    const key = queriedkeys[i]
    const sortField = sorted[key]
    const inverted = sortedInverted[sortField]
    const sortValues = inverted ? [-1, 1] : [1, -1]
    r[key] = sortField
      ? data.sort((a, b) =>
          a[sortField] > b[sortField] ? sortValues[0] : sortValues[1]
        )
      : data

    return r
  }, {})

  return result
}

const dateInfo = dateISO => {
  const date = new Date(dateISO)
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfMonth = new Date(year, month, 1, 0, 0, 0)
  const lastOfMonth = new Date(year, month + 1, 0, 23, 59, 59)

  return {
    firstOfMonth,
    lastOfMonth,
    year,
  }
}

const getMovements = ({begin, end}) =>
  db.collection('movements').where('date', '>=', begin).where('date', '<=', end)
const getMonthly = ({year}) =>
  db.collection('monthly').where('year', '==', year)
const getPayments = () =>
  db.collection('payments').where('paids', 'array-contains', false)
const getCategories = () => db.collection('categories')
const getOptions = () => db.collection('options')
const getFixed = () => db.collection('fixed').where('active', '==', true)

const keys = {
  movements: getMovements,
  monthly: getMonthly,
  payments: getPayments,
  categories: getCategories,
  options: getOptions,
  fixed: getFixed,
}

const getKeyRef = (key, dateISO) => {
  const {firstOfMonth, lastOfMonth, year} = dateInfo(dateISO)
  const begin = firstOfMonth.getTime()
  const end = lastOfMonth.getTime()

  return keys[key]({begin, end, year})
}

module.exports = {getKeyRef, getResponseData}
