import * as React from 'react'
import PropTypes from 'prop-types'
import {arc, select, scaleSequential, interpolate, interpolateRdYlGn} from 'd3'

const d3 = {
  arc,
  select,
  scaleSequential,
  interpolate,
  interpolateRdYlGn,
}

const margins = 30
const defaultStrokeWidth = 30
const perSilceAngle = (2 * Math.PI) / 100

const DonutChart = ({
  width = 100,
  height = 100,
  isMobile = false,
  ingreso,
  gasto,
}) => {
  const donutRef = React.useRef()
  const radius = Math.min(width, height) / 2 - margins
  const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([100, 0])
  const arcGenerator = d3.arc().innerRadius(radius).outerRadius(radius)
  const spentPer = ingreso ? Math.floor((gasto * 100) / ingreso) : gasto
  const translateHeight = height / 3 + (isMobile ? 24 : 0)
  const strokeWidth = defaultStrokeWidth * (isMobile || width < 200 ? 0.6 : 1)

  const data = new Array(100).fill(1).map((_, i) => ({
    stroke: i > spentPer ? '#fff0' : colorScale(i),
    startAngle: i * perSilceAngle,
    endAngle: (i + 1) * perSilceAngle,
  }))

  React.useEffect(() => {
    d3.select(donutRef.current)
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('stroke', d => d.stroke)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', strokeWidth)
      .transition()
      .duration(1000)
      .attrTween('d', d => {
        const start = {startAngle: 0, endAngle: 0}
        const i = d3.interpolate(start, d)
        return t => arcGenerator(i(t))
      })
  }, [arcGenerator, data, strokeWidth])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${width / 2} ${translateHeight})`}>
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke="#eee"
          strokeWidth={strokeWidth * 0.8}
        />
      </g>
      <g
        ref={donutRef}
        transform={`translate(${width / 2} ${translateHeight})`}
      />
    </svg>
  )
}

DonutChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  ingreso: PropTypes.number.isRequired,
  gasto: PropTypes.number.isRequired,
}

export {DonutChart}
