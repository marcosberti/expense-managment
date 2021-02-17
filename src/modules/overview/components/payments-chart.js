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

const rawPaymentData = [
  {
    detail: 'Aire acondicionado',
    firstPaymentMonth: '01-2021',
    lastPaymentMonth: '12-2021',
    amount: 5300.56,
    payments: 12,
    paidPayments: [
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    detail: 'Escritorio',
    firstPaymentMonth: '01-2021',
    lastPaymentMonth: '03-2021',
    amount: 3100.0,
    payments: 3,
    paidPayments: [true, true, false],
  },
  {
    detail: 'Celular',
    firstPaymentMonth: '10-2019',
    lastPaymentMonth: '04-2021',
    amount: 1444.0,
    payments: 18,
    paidPayments: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
    ],
  },
  {
    detail: 'Coderhouse',
    firstPaymentMonth: '09-2020',
    lastPaymentMonth: '11-2020',
    amount: 3577.0,
    payments: 3,
    paidPayments: [true, true, true],
  },
  {
    detail: 'Coderhouse v2',
    firstPaymentMonth: '09-2020',
    lastPaymentMonth: '01-2021',
    amount: 3577.0,
    payments: 5,
    paidPayments: [true, true, true, false, false],
  },
  {
    detail: 'Bici',
    firstPaymentMonth: '08-2020',
    lastPaymentMonth: '07-2021',
    amount: 4222.0,
    payments: 12,
    paidPayments: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ],
  },
]

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
