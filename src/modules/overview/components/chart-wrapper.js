/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {Small} from 'common-components'
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

const NavigationButton = styled.button`
  padding: 1rem 1.5rem;
  transition: opacity 0.25s ease, background-color 0.5s ease, color 0.5s ease;
  outline: none;
  background-color: var(
    ${props => (props.active ? '--primary-400' : '--background-color-light')}
  );

  &:hover {
    opacity: 0.75;
  }

  &:first-of-type {
    border-top-left-radius: var(--border-radius);
  }
`

const NavigationText = styled(Small)`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const getChartName = chartId => {
  const chartNameArr = chartId.split('-')
  return chartNameArr.slice(0, chartNameArr.length - 1).join(' ')
}

const NavigationButtons = ({activeId, childrenIds, handleActiveIdChange}) => {
  const handleClick = e => {
    handleActiveIdChange(e.currentTarget.dataset.id)
  }

  return (
    <div
      css={css`
        display: flex;
        border-bottom: 1px solid var(--primary-400);
      `}
    >
      {childrenIds.map(id => (
        <NavigationButton
          key={id}
          type="button"
          onClick={handleClick}
          data-id={id}
          active={activeId === id}
        >
          <NavigationText clear={activeId === id}>
            {getChartName(id)}
          </NavigationText>
        </NavigationButton>
      ))}
    </div>
  )
}

NavigationButtons.propTypes = {
  activeId: PropTypes.string.isRequired,
  childrenIds: PropTypes.array.isRequired,
  handleActiveIdChange: PropTypes.func.isRequired,
}

const ChartWrapper = ({wrapperId, children, className}) => {
  const containerRef = React.useRef()
  const dimentions = useDimentions(`#${wrapperId}`)
  const hasProps = Boolean(Object.keys(dimentions).length)
  const childrenCount = React.Children.count(children)
  const childrenIds = React.Children.map(children, child => child.props.id)
  const [activeId, setActiveId] = React.useState(childrenIds[0])

  const handleActiveIdChange = id => setActiveId(id)

  return (
    <>
      {childrenCount > 1 ? (
        <NavigationButtons
          activeId={activeId}
          childrenIds={childrenIds}
          handleActiveIdChange={handleActiveIdChange}
        />
      ) : null}
      <div
        id={wrapperId}
        css={css`
          height: 100%;
          width: 100%;
          overflow: hidden;
          position: relative;
        `}
        className={className ?? null}
      >
        <div
          ref={containerRef}
          css={css`
            width: ${(dimentions.width ?? 1) * childrenCount}px;
            display: flex;
            transition: transform 0.5s ease;
          `}
        >
          {hasProps
            ? React.Children.map(children, child =>
                child.props.id === activeId || activeId === null
                  ? React.cloneElement(child, dimentions)
                  : null
              )
            : null}
        </div>
      </div>
    </>
  )
}

ChartWrapper.propTypes = {
  wrapperId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
}

export {ChartWrapper, Chart}
