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

const rawPaymentData = []

// TODO: only for UI development
const getPaymentsData = () => {
  const currentDate = new Date()
  const currentYear = String(currentDate.getFullYear())
  const data = rawPaymentData.filter(p =>
    p.lastPaymentMonth.includes(currentYear)
  )
  return data
}

const getPaymentMonth = paymentMonth => {
  const monthIndex = Number(paymentMonth.split('-')[0])
  return monthIndex
}

const MIN_Y_DOMAIN_LENGTH = 6

const margins = {
  left: 32,
  top: 32,
  right: 32,
  bottom: 64,
}

const PaymentsChart = ({width, height, chartRef}) => {
  //   TODO: we will recieve this from props or make a hook
  const paymentsData = getPaymentsData()
  const xScale = d3
    .scaleLinear()
    .domain([0, 12])
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
      .attr('x', margins.left)
      .attr('width', 0)
      .attr('height', yScale.bandwidth())

    payments
      .transition()
      .duration(500)
      .attr('x', xScale(0))
      .attr(
        'width',
        d => xScale(getPaymentMonth(d.lastPaymentMonth)) - xScale(0)
      )

    paids
      .transition()
      .delay(250)
      .duration(500)
      .attr('x', xScale(0))
      .attr('width', d => {
        const unPaidPayments = d.paidPayments.filter(p => !p).length
        const lastPaymentMonth = getPaymentMonth(d.lastPaymentMonth)
        const currentYearPaidPayments = lastPaymentMonth - unPaidPayments

        // if currentYearPaidPayments is negative, it means that there is no
        // paid payment this year. we return 0 instead of the negative value
        return currentYearPaidPayments < 0
          ? 0
          : xScale(currentYearPaidPayments) - xScale(0)
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
      .attr('x', xScale(0))
      .attr('y', (d, i) => yScale(i) - yScale.bandwidth() / 4)
      .attr('dy', '0.35em')
      .text(
        d => `${d.detail} ${d.paidPayments.filter(p => p).length}/${d.payments}`
      )
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
