/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'

const ChartWrapper = ({wrapperId, children}) => {
  const dimentions = useDimentions(`#${wrapperId}`)
  const hasProps = Boolean(Object.keys(dimentions).length)

  return (
    <div
      id={wrapperId}
      css={css`
        height: 100%;
      `}
    >
      {hasProps ? React.cloneElement(children, dimentions) : null}
    </div>
  )
}

ChartWrapper.propTypes = {
  wrapperId: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export {ChartWrapper}
