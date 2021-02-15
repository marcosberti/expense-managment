/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'

const Chart = ({width, height, isMobile, children}) => {
  const chartRef = React.useRef()

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      ref={chartRef}
    >
      {React.cloneElement(children, {width, height, isMobile, chartRef})}
    </svg>
  )
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
}

const ChartWrapper = ({wrapperId, children, className}) => {
  const dimentions = useDimentions(`#${wrapperId}`)
  const hasProps = Boolean(Object.keys(dimentions).length)

  return (
    <div
      id={wrapperId}
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        overflow-x: auto;
      `}
      className={className ?? null}
    >
      {hasProps
        ? React.Children.map(children, child =>
            React.cloneElement(child, dimentions)
          )
        : null}
    </div>
  )
}

ChartWrapper.propTypes = {
  wrapperId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
}

export {ChartWrapper, Chart}
