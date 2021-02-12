import * as React from 'react'
import PropTypes from 'prop-types'
import {select, scaleSequential, interpolateRdYlGn, arc} from 'd3'

const d3 = {
  scaleSequential,
  interpolateRdYlGn,
  arc,
  select,
}

const margins = 30
const strokeWidth = 30
const perSilceAngle = (2 * Math.PI) / 100

const DonutChart = ({
  width = 100,
  height = 100,
  isMobile = false,
  income,
  spent,
}) => {
  const donutRef = React.useRef()
  const radius = (isMobile ? 250 : Math.min(width, height)) / 2 - margins
  const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([100, 0])
  const arcGenerator = d3.arc().innerRadius(radius).outerRadius(radius)
  const spentPer = Math.floor((spent * 100) / income)

  const data = new Array(100).fill(1).map((_, i) => ({
    stroke: i > spentPer ? '#fff0' : colorScale(i),
    path: arcGenerator({
      startAngle: i * perSilceAngle,
      endAngle: (i + 1) * perSilceAngle,
    }),
  }))

  console.log(width, height)

  const translateHeight = height / 3 + (isMobile ? 16 : 0)

  // React.useEffect(() => {
  //   d3.select(donutRef.current)
  //     .selectAll('path')
  //     .data(data)
  //     .attr('d', null)
  //     .transition()
  //     .duration(500)
  //     .attr('d', d => d.path)
  // }, [])

  return (
    <svg
      id="donut-chart"
      width={width ?? '100%'}
      height={height ?? '100%'}
      viewBox={width && height ? `0 0 ${width} ${height}` : '0 0 100 100'}
    >
      {width && height && (
        <>
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
          >
            {data.map(d => (
              <path
                key={d.path}
                d={d.path}
                fill="none"
                stroke={d.stroke}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            ))}
          </g>
        </>
      )}
    </svg>
  )
}

DonutChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {DonutChart}
