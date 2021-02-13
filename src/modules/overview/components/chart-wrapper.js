/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'

const ChartWrapper = ({wrapperId, children, className}) => {
  const dimentions = useDimentions(`#${wrapperId}`)
  const hasProps = Boolean(Object.keys(dimentions).length)

  return (
    <div
      id={wrapperId}
      css={css`
        height: 100%;
        width: 100%;
      `}
      className={className ?? null}
    >
      {hasProps ? React.cloneElement(children, dimentions) : null}
    </div>
  )
}

ChartWrapper.propTypes = {
  wrapperId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
}

export {ChartWrapper}
