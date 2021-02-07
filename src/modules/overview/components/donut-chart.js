import PropTypes from 'prop-types'
import {scaleSequential, interpolateRdYlGn, arc} from 'd3'
import {useDimentions} from '../../../hooks/useDimentions'

const d3 = {
  scaleSequential,
  interpolateRdYlGn,
  arc,
}

const margins = 30
const strokeWidth = 30
const perSilceAngle = (2 * Math.PI) / 100

const DonutChart = ({income, spent}) => {
  const {width, height, isMobile} = useDimentions('#donut')
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

  const translateHeight = height / 3 + (isMobile ? 16 : 0)

  return (
    <svg
      id="donut"
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
              strokeWidth={strokeWidth}
            />
          </g>
          <g transform={`translate(${width / 2} ${translateHeight})`}>
            {data.map(d => (
              <path
                key={d.path}
                d={d.path}
                fill="none"
                stroke={d.stroke}
                strokeWidth={strokeWidth * 0.8}
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
  income: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
}

export {DonutChart}
