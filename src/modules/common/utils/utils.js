const formatDate = date => {
  const time = date.getTime ? date.getTime() : date
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
  }).format(time)

  return formattedDate
}

const options = {style: 'currency', currency: 'ARS'}

const formatAmount = ammount => ammount.toLocaleString('es-AR', options)

export {formatDate, formatAmount}
