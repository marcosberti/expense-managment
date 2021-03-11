const getTime = date => {
  const time = date.getTime ? date.getTime() : new Date(date).getTime()
  return time
}

const getMonthDates = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstOfMonth = new Date(year, month)
  const lastOfMonth = new Date(year, month + 1, 0)
  return {
    firstOfMonth,
    lastOfMonth,
    month,
    year,
  }
}

const formatDate = date => {
  const time = date.getTime ? date.getTime() : date
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
  }).format(time)

  return formattedDate
}

const formatAmount = ammount =>
  ammount.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})

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

export {MONTHS, formatDate, formatAmount, getTime, getMonthDates}
