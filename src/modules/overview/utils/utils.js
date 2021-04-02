import {getDateData} from 'common-utils'

const getMainData = ({monthly}) => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const {income, spent} =
    monthly.find(g => g.month === month && g.year === year) ?? {}

  return {
    income: income ?? 0,
    spent: spent ?? 0,
  }
}

const getYearlyData = ({monthly}) => {
  const year = new Date().getFullYear()
  return new Array(12).fill('').map((_, month) => {
    const {income, spent} =
      monthly.find(m => m.month === month && m.year === year) ?? {}

    return {
      month,
      income: income ?? 0,
      spent: spent ?? 0,
    }
  })
}

// a los meses le sumamos 1 (el de inicio) y
// 2 (al ultimo) pq el chart va de 0 a 13,
// dos elementos extra para mejor visualizacion
const getFisrtPaymentMonth = firstPaymentDate => {
  const {year, month} = getDateData(firstPaymentDate)
  const currentYear = new Date().getFullYear()
  return currentYear > year ? 1 : month + 1
}

const getLastPaymentMonth = lastPaymentDate => {
  const {year, month} = getDateData(lastPaymentDate)
  const currentYear = new Date().getFullYear()
  return currentYear < year ? 13 : month + 2
}

const getPaidPaymentsMonth = (paids, firstPaymentDate) => {
  const paid = paids.filter(p => p).length
  const {year, month} = getDateData(firstPaymentDate)
  const paymentDate = new Date(year, month + 1 + paid)
  const paymentYear = paymentDate.getFullYear()
  const paymentMonth = paymentDate.getMonth()
  const currentYear = new Date().getFullYear()

  if (paymentYear < currentYear) {
    return 0
  }
  if (paymentYear > currentYear) {
    return 13
  }
  return paymentMonth
}

export {
  getMainData,
  getYearlyData,
  getFisrtPaymentMonth,
  getLastPaymentMonth,
  getPaidPaymentsMonth,
}
