import * as React from 'react'
import {bp} from 'media-queries'

const useDimentions = (selector = 'body') => {
  const [dimentions, setDimentions] = React.useState(null)
  const [width, setWidth] = React.useState(window.innerWidth)

  const handleResize = React.useCallback(() => {
    const elem = document.querySelector(selector)
    setWidth(window.innerWidth)
    setDimentions({
      width: elem.clientWidth,
      height: elem.clientHeight,
    })
  }, [selector])

  React.useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useLayoutEffect(() => {
    const elem = document.querySelector(selector)
    setDimentions({
      width: elem.clientWidth,
      height: elem.clientHeight,
    })
  }, [selector])

  return dimentions ? {...dimentions, isMobile: width <= bp} : {}
}

export {useDimentions}
