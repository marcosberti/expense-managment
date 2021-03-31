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

const getPaymentDateData = time => {
  const date = new Date(time)

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  }
}

const getFisrtPaymentMonth = firstPaymentDate => {
  const {year, month} = getPaymentDateData(firstPaymentDate)
  const currentYear = new Date().getFullYear()
  return currentYear > year ? 1 : month
}

const getLastPaymentMonth = lastPaymentDate => {
  const {year, month} = getPaymentDateData(lastPaymentDate)
  const currentYear = new Date().getFullYear()
  // le sumamos 1 al mes para que se visualize mejor en el chart
  return currentYear < year ? 13 : month + 1
}

const getPaidPaymentsMonth = (paids, firstPaymentDate) => {
  const paid = paids.filter(p => p).length
  const {year, month} = getPaymentDateData(firstPaymentDate)
  const paymentDate = new Date(year, month - 1 + paid)
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
