const animationDuration = 1000
const strokeWidth = 25

const getDimentions = svg => {
  // identify the dimensions of the viewBox to establish the svg canvas
  const viewBox = svg.attr('viewBox')
  const regexViewBox = /\d+ \d+ (\d+) (\d+)/
  // ! .match() returns string values
  const [, viewBoxWidth, viewBoxHeight] = viewBox
    .match(regexViewBox)
    .map(item => Number.parseInt(item, 10))

  return {width: viewBoxWidth, height: viewBoxHeight}
}

const getCircleData = (width, height) => {
  // compute the radius as half the minor size between the width and height
  const radius = Math.min(width, height) / 2

  const perim = radius * 3.14 * 2

  return {radius, perim}
}

export {animationDuration, strokeWidth, getDimentions, getCircleData}
