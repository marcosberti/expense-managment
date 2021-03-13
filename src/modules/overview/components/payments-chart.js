import * as React from 'react'
import {scaleLinear, scaleBand, range, select, axisBottom} from 'd3'
import {MONTHS} from 'common-utils'

const d3 = {
  scaleLinear,
  scaleBand,
  range,
  select,
  axisBottom,
}

const getPaymentDateData = fecha => ({
  anio: Number(fecha.split('-')[0]),
  mes: Number(fecha.split('-')[1]),
  dia: Number(fecha.split('-')[2]),
})

const checkPaymentYears = (fechaPrimerPago, fechaUltimoPago) => {
  const primerPago = getPaymentDateData(fechaPrimerPago)
  const ultimoPago = getPaymentDateData(fechaUltimoPago)
  return primerPago.anio === ultimoPago.anio
}

const getLastPaymentMonth = (fechaPrimerPago, fechaUltimoPago) => {
  const mismoAnio = checkPaymentYears(fechaPrimerPago, fechaUltimoPago)
  const {mes} = getPaymentDateData(fechaUltimoPago)
  // le sumamos 1 al mes para que se visualize mejor en el chart
  return mismoAnio ? mes + 1 : 13
}

const getPaidPaymentsMonth = (pagos, fechaPrimerPago) => {
  const pagosHechos = pagos.filter(p => p).length
  const {anio, mes} = getPaymentDateData(fechaPrimerPago)
  const fechaPagos = new Date(anio, mes - 1 + pagosHechos)
  const {anio: anioPagos, mes: mesPagos} = getPaymentDateData(
    fechaPagos.toISOString()
  )
  const mismoAnio = checkPaymentYears(fechaPrimerPago, fechaPagos.toISOString())

  console.error('calc mes pagos para cuotas que vienen de anios anteriores')
  console.error('calc mes pagos para cuotas que van a anios posteriores')

  if (anioPagos > anio) {
    return 13
  }
  return mismoAnio ? mesPagos : 0
}

const MIN_Y_DOMAIN_LENGTH = 6

const margins = {
  left: 32,
  top: 32,
  right: 32,
  bottom: 64,
}

const PaymentsChart = ({width, height, chartRef, paymentsData}) => {
  // se agregan dos valores al dominio para que haya un extra en cada
  // extremo del chart
  const xScale = d3
    .scaleLinear()
    .domain([0, 13])
    .range([margins.left, width - margins.right - margins.left])

  const yDomainLength =
    paymentsData.length < MIN_Y_DOMAIN_LENGTH
      ? MIN_Y_DOMAIN_LENGTH
      : paymentsData.length

  const yScale = d3
    .scaleBand()
    .domain(d3.range(yDomainLength))
    .rangeRound([margins.top, height - margins.bottom])
    .padding(0.4)

  const xAxis = axisBottom()
    .scale(xScale)
    .tickFormat(v => (v ? MONTHS[v - 1] : ''))

  React.useEffect(() => {
    const payments = d3
      .select(chartRef.current)
      .append('g')
      .selectAll('rect')
      .data(paymentsData)
      .join('rect')
      .attr('y', (d, i) => yScale(i))
      .attr('fill', 'var(--secondary-500)')

    const paids = d3
      .select(chartRef.current)
      .append('g')
      .selectAll('rect')
      .data(paymentsData)
      .join('rect')
      .attr('y', (d, i) => yScale(i))
      .attr('fill', 'var(--secondary-300)')

    d3.select(chartRef.current)
      .selectAll('g rect')
      .attr(
        'x',
        d => xScale(getPaymentDateData(d.fechaPrimerPago).mes) - margins.left
      )
      .attr('width', 0)
      .attr('height', yScale.bandwidth())

    payments
      .transition()
      .duration(500)
      .attr(
        'x',
        d => xScale(getPaymentDateData(d.fechaPrimerPago).mes) - margins.left
      )
      .attr(
        'width',
        d =>
          xScale(getLastPaymentMonth(d.fechaPrimerPago, d.fechaUltimoPago)) -
          xScale(getPaymentDateData(d.fechaPrimerPago).mes)
      )

    paids
      .transition()
      .delay(250)
      .duration(500)
      .attr(
        'x',
        d => xScale(getPaymentDateData(d.fechaPrimerPago).mes) - margins.left
      )
      .attr('width', d => {
        const mesPagos = getPaidPaymentsMonth(d.pagos, d.fechaPrimerPago)

        return mesPagos
          ? xScale(mesPagos) - xScale(getPaymentDateData(d.fechaPrimerPago).mes)
          : 0
      })
  }, [chartRef, paymentsData, xScale, yScale])

  React.useEffect(() => {
    d3.select(chartRef.current)
      .append('g')
      .attr('fill', 'var(--text-color)')
      .attr('text-anchor', 'start')
      .attr('font-size', 'var(--font-size-sm)')
      .attr('font-weight', 500)
      .selectAll('text')
      .data(paymentsData)
      .join('text')
      .attr(
        'x',
        d => xScale(getPaymentDateData(d.fechaPrimerPago).mes) - margins.left
      )
      .attr('y', (d, i) => yScale(i) - yScale.bandwidth() / 4)
      .attr('dy', '0.35em')
      .text(d => `${d.detalle} ${d.pagos.filter(p => p).length}/${d.cuotas}`)
      .attr('opacity', 0)
      .transition(500)
      .delay(250)
      .attr('opacity', 1)
  }, [chartRef, paymentsData, xScale, yScale])

  React.useEffect(() => {
    d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(0, ${height - margins.bottom})`)
      .call(xAxis)
  }, [chartRef, height, xAxis])

  //   it's render and controlled by D3
  return null
}

export {PaymentsChart}
