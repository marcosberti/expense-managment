import {getTime, getMonthDates} from 'common-utils'

const getMovementsMonth = location => {
  if (location.search) {
    // eslint-disable-next-line no-shadow
    const [year, month] = location.search.split('=')[1].split('-')
    return [Number(year), Number(month) - 1]
  }
  const {month, year} = getMonthDates()
  return [year, month]
}

const filterMovements = (movimientos, month, year) =>
  movimientos
    .filter(m => {
      const [mYear, mMonth] = m.fecha.split('-')
      return mYear === year && mMonth === month
    })
    .sort((a, b) => (getTime(a.fecha) < getTime(b.fecha) ? 1 : -1))

const getMovements = ({movements}, location) => {
  const [year, month] = getMovementsMonth(location)
  return filterMovements(movements, month, year)
}

export {getMovements}
