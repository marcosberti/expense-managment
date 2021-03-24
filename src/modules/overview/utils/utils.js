import {getMonthDates, getTime} from 'common-utils'

const getMainData = ({ingresos, gastosMensual}) => {
  const {firstOfMonth, lastOfMonth, year, month} = getMonthDates()
  const fomTime = getTime(firstOfMonth)
  const eomTime = getTime(lastOfMonth)

  const ingreso = ingresos.find(i => {
    const ingTime = getTime(i.fecha)
    return ingTime >= fomTime && ingTime <= eomTime
  })

  const gasto = gastosMensual.find(
    g => g.anio === year.toString() && g.mes === month.toString()
  )

  return {
    ingreso: ingreso?.monto ?? 0,
    moneda: ingreso?.moneda,
    gasto: gasto?.monto ?? 0,
  }
}

const getYearlyData = ({ingresos, gastosMensual}) => {
  const data = new Array(12).fill('').map((_, mes) => {
    const ingreso = ingresos.find(i => {
      const fecha = new Date(i.fecha)
      const ingMes = fecha.getMonth()
      return ingMes === mes
    })

    const gasto = gastosMensual.find(g => g.mes === mes.toString())

    return {
      mes,
      ingreso: ingreso?.monto ?? 0,
      moneda: ingreso?.moneda ?? 'ars',
      gasto: gasto?.monto ?? 0,
    }
  })

  return data
}

const getPaymentDateData = fecha => ({
  anio: Number(fecha.split('-')[0]),
  mes: Number(fecha.split('-')[1]),
  dia: Number(fecha.split('-')[2]),
})

const getFisrtPaymentMonth = fechaPrimerPago => {
  const {anio, mes} = getPaymentDateData(fechaPrimerPago)
  const currAnio = new Date().getFullYear()
  return currAnio > anio ? 1 : mes
}

const getLastPaymentMonth = fechaUltimoPago => {
  const {anio, mes} = getPaymentDateData(fechaUltimoPago)
  const currAnio = new Date().getFullYear()
  // le sumamos 1 al mes para que se visualize mejor en el chart
  return currAnio < anio ? 13 : mes + 1
}

const getPaidPaymentsMonth = (pagos, fechaPrimerPago) => {
  const pagosHechos = pagos.filter(p => p).length
  const {anio, mes} = getPaymentDateData(fechaPrimerPago)
  const fechaPagos = new Date(anio, mes - 1 + pagosHechos)
  const {anio: anioPagos, mes: mesPagos} = getPaymentDateData(
    fechaPagos.toISOString()
  )
  const currAnio = new Date().getFullYear()
  if (anioPagos < currAnio) {
    return 0
  }
  if (anioPagos > currAnio) {
    return 13
  }
  return mesPagos
}

export {
  getMainData,
  getYearlyData,
  getFisrtPaymentMonth,
  getLastPaymentMonth,
  getPaidPaymentsMonth,
}
