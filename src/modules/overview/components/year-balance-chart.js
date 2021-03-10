import * as React from 'react'
import {axisLeft, axisBottom, scaleLinear, scaleBand, max, select} from 'd3'
import {MONTHS, formatAmount} from 'common-utils'

const d3 = {
  axisLeft,
  axisBottom,
  scaleLinear,
  scaleBand,
  max,
  select,
}

const margins = {
  left: 80,
  top: 32,
  right: 64,
  bottom: 64,
}

// TODO: only for UI development
const monthlyIncome = []

const YearBalanceChart = ({width, height, chartRef}) => {
  const xScale = d3
    .scaleBand()
    .domain(MONTHS)
    .range([margins.left, width - margins.right])

  const yMax = d3.max(monthlyIncome, d => d.income)

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margins.bottom, margins.top])

  const xAxis = d3.axisBottom().scale(xScale)
  const yAxis = d3.axisLeft().scale(yScale)

  React.useEffect(() => {
    const chartGroup = d3.select(chartRef.current).append('g')

    const incomeRects = chartGroup
      .selectAll('rect.income')
      .data(monthlyIncome)
      .join('rect')
      .attr('class', 'income')
      .attr('fill', 'var(--secondary-500)')
      .attr('transform', `translate(${xScale.bandwidth() / 4})`)

    incomeRects.append('title').text(d => formatAmount(d.income))

    const expensesRects = chartGroup
      .selectAll('rect.expenses')
      .data(monthlyIncome)
      .join('rect')
      .attr('class', 'expenses')
      .attr('fill', 'var(--secondary-300)')
      .attr('transform', `translate(${xScale.bandwidth() / 2})`)

    expensesRects.append('title').text(d => formatAmount(d.expenses))

    d3.select(chartRef.current)
      .selectAll('g rect')
      .attr('x', d => xScale(MONTHS[d.month]))
      .attr('width', xScale.bandwidth() / 4)
      .attr('y', height - margins.bottom)
      .attr('height', 0)
      .on('mouseover', function () {
        d3.select(this).attr('opacity', 0.75)
      })
      .on('mouseout', function () {
        d3.select(this).attr('opacity', 1)
      })

    incomeRects
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.income))
      .attr('height', d => yScale(0) - yScale(d.income))

    expensesRects
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.expenses))
      .attr('height', d => yScale(0) - yScale(d.expenses))

    d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(0, ${height - margins.bottom})`)
      .call(xAxis)
    d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(${margins.left}, 0)`)
      .call(yAxis)
  }, [chartRef, height, xAxis, xScale, yAxis, yScale])

  return null
}

export {YearBalanceChart}
