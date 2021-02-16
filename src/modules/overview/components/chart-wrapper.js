/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'
import {NavigationBackIcon, NavigationNextIcon} from 'icons'

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
  /* position: absolute; */
  /* top: 50%; */
  /* transform: translateY(-50%); */
  padding: 0.5rem;
  /* opacity: 0.25; */
  /* transition: opacity 0.25s ease; */
  border-radius: var(--border-radius);
  outline: none;

  &:hover {
    opacity: 0.75;
  }
`

const NavigationButtons = ({childrenIds, handleActiveIdChange}) => {
  const handleClick = e => {
    handleActiveIdChange(e.currentTarget.dataset.id)
  }
  console.error('cambiar estilos de los botones')
  return childrenIds.map(id => (
    <NavigationButton key={id} type="button" onClick={handleClick} data-id={id}>
      {id.replaceAll('-', ' ')}
    </NavigationButton>
  ))
}

const ChartWrapper = ({wrapperId, children, className}) => {
  const containerRef = React.useRef()
  const [activeId, setActiveId] = React.useState(null)
  const dimentions = useDimentions(`#${wrapperId}`)
  const hasProps = Boolean(Object.keys(dimentions).length)
  const childrenCount = React.Children.count(children)
  const childrenIds = React.Children.map(children, child => child.props.id)

  const handleActiveIdChange = id => setActiveId(id)

  console.error('animacion con framer motion')

  console.error(
    'si hay navigation buttons, hay que restarselo al width y height'
  )

  return (
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
      {childrenCount > 1 ? (
        <NavigationButtons
          childrenIds={childrenIds}
          handleActiveIdChange={handleActiveIdChange}
        />
      ) : null}
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
  )
}

ChartWrapper.propTypes = {
  wrapperId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
}

export {ChartWrapper, Chart}
