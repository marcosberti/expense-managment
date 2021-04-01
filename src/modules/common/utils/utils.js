const formatDate = time => {
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

export {MONTHS, formatDate, formatAmount}
