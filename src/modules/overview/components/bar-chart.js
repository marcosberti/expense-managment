import * as React from 'react'
import PropTypes from 'prop-types'
import {axisLeft, axisBottom, scaleLinear, scaleBand, max, select} from 'd3'
import {secondary} from 'colors'
import {formatAmount} from 'common-utils'

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

const monthlyIncome = [
  {month: 'Ene', income: 80000, expenses: 50000},
  {month: 'Feb', income: 80000, expenses: 30000},
  {month: 'Mar', income: 80000, expenses: 25000},
  {month: 'Abr', income: 88000, expenses: 64000},
  {month: 'May', income: 88000, expenses: 30000},
  {month: 'Jun', income: 88000, expenses: 55000},
  {month: 'Jul', income: 94000, expenses: 70000},
  {month: 'Ago', income: 94000, expenses: 45000},
  {month: 'Sep', income: 94000, expenses: 45000},
  {month: 'Oct', income: 105000, expenses: 77000},
  {month: 'Nov', income: 105000, expenses: 80000},
  {month: 'Dic', income: 105000, expenses: 20000},
]

const BarChart = ({width = 100, height = 100}) => {
  const xAxisRef = React.useRef()
  const yAxisRef = React.useRef()
  const chartRef = React.useRef()

  const xScale = d3
    .scaleBand()
    .domain(monthlyIncome.map(d => d.month))
    .range([margins.left, width - margins.right])

  const yMax = d3.max(monthlyIncome, d => d.income)

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margins.bottom, margins.top])

  const xAxis = d3.axisBottom().scale(xScale)
  const yAxis = d3.axisLeft().scale(yScale)

  React.useEffect(() => {
    const incomeRects = d3
      .select(chartRef.current)
      .selectAll('rect.income')
      .data(monthlyIncome)
      .join('rect')
      .attr('class', 'income')
      .attr('fill', secondary[500])
      .attr('transform', `translate(${xScale.bandwidth() / 4})`)

    incomeRects.append('title').text(d => formatAmount(d.income))

    const expensesRects = d3
      .select(chartRef.current)
      .selectAll('rect.expenses')
      .data(monthlyIncome)
      .join('rect')
      .attr('class', 'expenses')
      .attr('fill', secondary[300])
      .attr('transform', `translate(${xScale.bandwidth() / 2})`)

    expensesRects.append('title').text(d => formatAmount(d.expenses))

    d3.select(chartRef.current)
      .selectAll('rect')
      .attr('x', d => xScale(d.month))
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

    d3.select(xAxisRef.current).call(xAxis)
    d3.select(yAxisRef.current).call(yAxis)
  }, [height, xAxis, xScale, yAxis, yScale])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g ref={chartRef} />
      <g
        ref={xAxisRef}
        transform={`translate(0, ${height - margins.bottom})`}
      />
      <g ref={yAxisRef} transform={`translate(${margins.left} ,0)`} />
    </svg>
  )
}

BarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

export {BarChart}
