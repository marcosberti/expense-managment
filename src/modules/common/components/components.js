import * as React from 'react'
import PropTypes from 'prop-types'
import {useDimentions} from 'hooks'
import {IconSVG} from 'icons'

const CustomSVG = ({icon, ...props}) => {
  const iconRef = React.useRef()

  React.useEffect(() => {
    iconRef.current.innerHTML = icon
  }, [icon])

  return <IconSVG iconRef={iconRef} {...props} />
}
CustomSVG.propTypes = {
  icon: PropTypes.string.isRequired,
}

const DesktopOnly = ({children}) => {
  const {isMobile} = useDimentions()

  return !isMobile ? children : null
}

const MobileOnly = ({children}) => {
  const {isMobile} = useDimentions()

  return isMobile ? children : null
}

export {CustomSVG, DesktopOnly, MobileOnly}
