import * as React from 'react'
import * as d3 from 'd3'
import {
  animationDuration,
  strokeWidth,
  getDimentions,
  getCircleData,
} from '../utils/donut-chart'
import {neutral, primary} from '../../../styles/colors'

const DonutChart = ({income, spent}) => {
  React.useEffect(() => {
    const svg = d3.select('svg')
    const {width, height} = getDimentions(svg)
    const {radius, perim} = getCircleData(width, height)

    const group = svg
      .append('g')
      .attr('transform', `translate(${width / 2} ${height / 8})`)

    // append the circle showing only the stroke
    group
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'none')
      .attr('stroke', neutral[200])
      .attr('stroke-width', strokeWidth)
      .attr('stroke-linecap', 'round')
      // hide the stroke of the circle using the radius
      // this to compute the circumference of the shape
      .attr('stroke-dasharray', perim)
      .attr('stroke-dashoffset', perim)

    // append the circle showing only the stroke
    const spentCircle = group
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', radius)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'none')
      .attr('stroke', primary[300])
      .attr('stroke-width', 0)
      .attr('stroke-linecap', 'round')
      // hide the stroke of the circle using the radius
      // this to compute the circumference of the shape
      .attr('stroke-dasharray', perim)
      .attr('stroke-dashoffset', perim)

    // TRANSITIONS
    // once the elements are set up
    // draw the stroke of the larger circle element

    const dif = income - spent

    const scale = d3.scaleLinear().domain([0, income]).range([0, perim])

    const rest = scale(dif)

    group
      .select('circle')
      .transition()
      .ease(d3.easeExp)
      .delay(100)
      .duration(animationDuration * 1.5)
      .attr('stroke-dashoffset', '0')
      .on('end', () => {
        spentCircle
          .attr('stroke-width', strokeWidth * 0.8)
          .transition()
          .ease(d3.easeExp)
          .duration(animationDuration)
          .attr('stroke-dashoffset', rest)
      })
  }, [income, spent])

  return <svg id="donut" width="400" height="100%" viewBox="0 0 400 250" />
}

export {DonutChart}
