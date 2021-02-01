import * as React from 'react'
import {bp} from '../styles/media-queries'

const useMobile = () => {
  const [width, setWidth] = React.useState(window.innerWidth)

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = React.useMemo(() => width <= bp, [width])

  return isMobile
}

export {useMobile}
