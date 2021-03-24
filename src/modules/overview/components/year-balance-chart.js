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

const YearBalanceChart = ({width, height, chartRef, yearData}) => {
  const xScale = d3
    .scaleBand()
    .domain(MONTHS)
    .range([margins.left, width - margins.right])

  const yMax = d3.max(yearData, d => d.ingreso)

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
      .data(yearData)
      .join('rect')
      .attr('class', 'income')
      .attr('fill', 'var(--secondary-500)')
      .attr('transform', `translate(${xScale.bandwidth() / 4})`)

    incomeRects.append('title').text(d => formatAmount(d.ingreso, d.moneda))

    const expensesRects = chartGroup
      .selectAll('rect.expenses')
      .data(yearData)
      .join('rect')
      .attr('class', 'expenses')
      .attr('fill', 'var(--secondary-300)')
      .attr('transform', `translate(${xScale.bandwidth() / 2})`)

    expensesRects.append('title').text(d => formatAmount(d.gasto, d.moneda))

    d3.select(chartRef.current)
      .selectAll('g rect')
      .attr('x', d => xScale(MONTHS[d.mes]))
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
      .attr('y', d => yScale(d.ingreso))
      .attr('height', d => yScale(0) - yScale(d.ingreso))

    expensesRects
      .transition()
      .duration(500)
      .attr('y', d => yScale(d.gasto))
      .attr('height', d => yScale(0) - yScale(d.gasto))

    d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(0, ${height - margins.bottom})`)
      .call(xAxis)
    d3.select(chartRef.current)
      .append('g')
      .attr('transform', `translate(${margins.left}, 0)`)
      .call(yAxis)
  }, [chartRef, height, xAxis, xScale, yAxis, yScale, yearData])

  return null
}

export {YearBalanceChart}
