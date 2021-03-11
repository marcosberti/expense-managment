import {getMonthDates, getTime} from 'common-utils'

const getMainData = ({ingresos, gastos}) => {
  const {firstOfMonth, lastOfMonth, year, month} = getMonthDates()
  const fomTime = getTime(firstOfMonth)
  const eomTime = getTime(lastOfMonth)

  const ingreso = ingresos.find(i => {
    const ingTime = getTime(i.fecha)
    return ingTime >= fomTime && ingTime <= eomTime
  })

  const gasto = gastos.find(
    g => g.anio === year.toString() && g.mes === month.toString()
  )

  return {
    ingreso: ingreso?.monto ?? 0,
    gasto: gasto?.monto ?? 0,
  }
}

const getYearlyData = ({ingresos, gastos}) => {
  const data = new Array(12).fill('').map((_, mes) => {
    const ingreso = ingresos.find(i => {
      const fecha = new Date(i.fecha)
      const ingMes = fecha.getMonth()
      return ingMes === mes
    })

    const gasto = gastos.find(g => g.mes === mes.toString())

    return {
      mes,
      ingreso: ingreso?.monto ?? 0,
      gasto: gasto?.monto ?? 0,
    }
  })

  return data
}

export {getMainData, getYearlyData}
