const getMovementsMonth = location => {
  if (location.search) {
    // eslint-disable-next-line no-shadow
    const [year, month] = location.search.split('=')[1].split('-')
    return [Number(year), Number(month) - 1]
  }
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  return [year, month]
}

const filterMovements = (movements, month, year) =>
  movements
    .filter(({date}) => {
      const movDate = new Date(date)
      const movYear = movDate.getFullYear()
      const movMonth = movDate.getMonth()
      return movYear === year && movMonth === month
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

const getMovements = ({movements}, location) => {
  const [year, month] = getMovementsMonth(location)
  return filterMovements(movements, month, year)
}

export {getMovements}
