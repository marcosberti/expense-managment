import {getMonthDates} from 'common-utils'

const getMainData = ({movimientosMensuales}) => {
  const {month} = getMonthDates()
  const {ingreso, egreso} =
    movimientosMensuales.find(g => g.mes === String(month)) ?? {}

  return {
    ingreso: ingreso ?? 0,
    moneda: 'ars',
    egreso: egreso ?? 0,
  }
}

const getYearlyData = ({movimientosMensuales}) => {
  const data = new Array(12).fill('').map((_, mes) => {
    const {ingreso, egreso} =
      movimientosMensuales.find(m => m.mes === String(mes)) ?? {}

    return {
      mes,
      ingreso: ingreso ?? 0,
      moneda: 'ars',
      egreso: egreso ?? 0,
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
