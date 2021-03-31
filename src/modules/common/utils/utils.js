const getTime = date => {
  const _d = typeof date === 'string' ? date.replace('Z', '') : date
  const time = date.getTime ? date.getTime() : new Date(_d).getTime()
  return time
}

const getMonthDates = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfMonth = new Date(year, month, 1, 0, 0, 0)
  const lastOfMonth = new Date(year, month + 1, 0, 23, 59, 59)
  return {
    firstOfMonth,
    lastOfMonth,
    month,
    year,
  }
}

const formatDateToISO = date => (date ? `${date}T00:00:00Z` : null)

const formatDate = date => {
  const time = getTime(date)
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
  }).format(time)

  return formattedDate
}

const formatAmount = (ammount, currency = 'ars') =>
  new Intl.NumberFormat('es-AR', {style: 'currency', currency}).format(ammount)

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export {
  MONTHS,
  formatDate,
  formatDateToISO,
  formatAmount,
  getTime,
  getMonthDates,
}
