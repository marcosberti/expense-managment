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

const getDateData = time => {
  const dateObj = new Date(time)
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const date = dateObj.getDate()

  return {
    year,
    month,
    date,
  }
}

const formatDate = time => {
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
  }).format(time)

  return formattedDate
}

const formatAmount = (ammount, currency = 'ars') =>
  new Intl.NumberFormat('es-AR', {style: 'currency', currency}).format(ammount)

export {getDateData, formatDate, formatAmount, MONTHS}
