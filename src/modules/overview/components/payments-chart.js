import * as React from 'react'
import {scaleLinear, scaleBand, range, select, axisBottom} from 'd3'
import {MONTHS} from 'common-utils'
import {
  getFisrtPaymentMonth,
  getLastPaymentMonth,
  getPaidPaymentsMonth,
} from '../utils/utils'

const d3 = {
  scaleLinear,
  scaleBand,
  range,
  select,
  axisBottom,
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
        d => xScale(getFisrtPaymentMonth(d.firstPaymentDate)) - margins.left
      )
      .attr('width', 0)
      .attr('height', yScale.bandwidth())

    payments
      .transition()
      .duration(500)
      .attr(
        'x',
        d => xScale(getFisrtPaymentMonth(d.firstPaymentDate)) - margins.left
      )
      .attr(
        'width',
        d =>
          xScale(getLastPaymentMonth(d.lastPaymentDate)) -
          xScale(getFisrtPaymentMonth(d.firstPaymentDate))
      )

    paids
      .transition()
      .delay(250)
      .duration(500)
      .attr(
        'x',
        d => xScale(getFisrtPaymentMonth(d.firstPaymentDate)) - margins.left
      )
      .attr('width', d => {
        const mesPagos = getPaidPaymentsMonth(d.paids, d.firstPaymentDate)

        return mesPagos
          ? xScale(mesPagos) - xScale(getFisrtPaymentMonth(d.firstPaymentDate))
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
        d => xScale(getFisrtPaymentMonth(d.firstPaymentDate)) - margins.left
      )
      .attr('y', (d, i) => yScale(i) - yScale.bandwidth() / 4)
      .attr('dy', '0.35em')
      .text(d => `${d.detalle} ${d.paids.filter(p => p).length}/${d.payments}`)
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
