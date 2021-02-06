/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as React from 'react'
import * as d3 from 'd3'
import {neutral, secondary, transparent} from '../../../styles/colors'

const duration = 1000
const strokeWidth = 25

const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 10,
}

const getDimentions = svg => {
  // identify the dimensions of the viewBox to establish the svg canvas
  const viewBox = svg.attr('viewBox')
  const regexViewBox = /\d+ \d+ (\d+) (\d+)/
  // ! .match() returns string values
  const [, viewBoxWidth, viewBoxHeight] = viewBox
    .match(regexViewBox)
    .map(item => Number.parseInt(item, 10))

  // with the margin convention include a group element translated within the svg canvas

  // compute the width and height of the actual viz from the viewBox dimensions and considering the margins
  // this to later work with width and height attributes directly through the width and height variables
  const width = viewBoxWidth - (margin.left + margin.right)
  const height = viewBoxHeight - (margin.top + margin.bottom)

  return {width, height}
}

const getCircleData = (width, height) => {
  // compute the radius as half the minor size between the width and height
  const radius = Math.min(width, height) / 2

  const perim = radius * 3.14 * 2

  return {radius, perim}
}

const getSpentPercentage = (income, spent) => (spent * 100) / income
const getChartData = (income, spent) => {
  const spentPercentage = getSpentPercentage(income, spent)
  return [
    {
      value: spentPercentage,
      color: secondary[400],
    },
    {
      value: 100 - spentPercentage,
      color: transparent,
    },
  ]
}
const DonutChart = ({income, spent}) => {
  const chartData = getChartData(income, spent)

  React.useEffect(() => {
    const svg = d3.select('svg')
    const {width, height} = getDimentions(svg)
    const {radius, perim} = getCircleData(width, height)

    const group = svg
      .append('g')
      .attr('transform', `translate(${margin.left} ${margin.top})`)

    // DEFAULT CIRCLE
    // circle used as a background for the colored donut chart
    // add a group to center the circle in the canvas (this to rotate the circle from the center)
    const groupDefault = group
      .append('g')
      .attr('transform', `translate(${width / 2} ${height / 8})`)

    // append the circle showing only the stroke
    groupDefault
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'none')
      .attr('stroke', neutral[300])
      .attr('stroke-width', strokeWidth)
      .attr('stroke-linecap', 'round')
      // hide the stroke of the circle using the radius
      // this to compute the circumference of the shape
      .attr('stroke-dasharray', perim)
      .attr('stroke-dashoffset', perim)

    // COLORED CIRCLES
    // pie function to compute the arcs
    const pie = d3
      .pie()
      .sort(null)
      .padAngle(0.12)
      .value(d => d.value)

    // arc function to create the d attributes for the path elements
    const arc = d3
      .arc()
      // have the arc overlaid on top of the stroke of the circle
      .innerRadius(radius)
      .outerRadius(radius)

    // wrapping group, horizontally centered
    const groupArcs = group
      .append('g')
      .attr('transform', `translate(${width / 2} ${height / 8})`)

    const groupsArcs = groupArcs
      .selectAll('g')
      .data(pie(chartData))
      .enter()
      .append('g')

    // include the arcs specifying the stroke with the same width of the circle element
    groupsArcs
      .append('path')
      .attr('d', arc)
      .attr('fill', 'none')
      .attr('stroke', d => d.data.color)
      .attr('stroke-width', strokeWidth * 0.8)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      // hide the segments by applying a stroke-dasharray/stroke-dashoffset equal to the circle circumference
      // ! the length of the element varies, and it considered afterwords
      // for certain the paths are less than the circumference of the entire circle
      .attr('stroke-dasharray', perim)
      .attr('stroke-dashoffset', perim)

    // TRANSITIONS
    // once the elements are set up
    // draw the stroke of the larger circle element
    groupDefault
      .select('circle')
      .transition()
      .ease(d3.easeExp)
      .delay(100)
      .duration(duration * 1.5)
      .attr('stroke-dashoffset', '0')
      .on('end', () => {
        // immediately set the stroke-dasharray and stroke-dashoffset properties to match the length of the path elements
        // using vanilla JavaScript
        const paths = document.querySelectorAll('svg#donut g g path')
        paths.forEach(path => {
          const length = path.getTotalLength()
          path.setAttribute('stroke-dasharray', length)
          path.setAttribute('stroke-dashoffset', length)
        })

        // transition the path elements to stroke-dashoffset 0
        d3.selectAll('svg g g path')
          .transition()
          .ease(d3.easeLinear)
          // .delay((d, i) => i * duration)
          .duration(duration)
          .attr('stroke-dashoffset', 0)
      })
  }, [chartData])

  return (
    <div
      css={css`
        height: 100%;
        position: relative;
      `}
    >
      <span
        css={css`
          position: absolute;
          top: 34%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          font-weight: 700;
          color: ${neutral[400]};
        `}
      >
        {chartData[0].value.toFixed(2)}%
      </span>
      <svg id="donut" width="400" height="100%" viewBox="0 0 400 250" />
    </div>
  )
}

export {DonutChart}
