/** @jsxImportSource @emotion/react */
import * as React from 'react'
import PropTypes from 'prop-types'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {useDimentions} from 'hooks'
import * as mq from 'media-queries'
import {MenuIcon, DeclineIcon} from 'icons'
import {Button} from 'common-components'

const Nav = styled.nav`
  background-color: var(--background-color-light);
  height: 100vh;
  width: 100vw;
  position: absolute;
  transition: transform 0.5s ease;
  transform: translateX(-100vw);
  z-index: 1;

  ${mq.large} {
    transform: none;
    position: static;
    width: 100%;
    grid-area: navbar;
  }
`

const Navbar = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;

  & > li {
    margin-top: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.25s ease;
  }

  & > li:hover {
    transform: translateY(-2px);
  }

  & > li:first-of-type {
    margin-top: 150px;
  }
`

const NavbarItem = styled.li`
  font-weight: 500;
  letter-spacing: 1px;
  ${({isActive = false}) =>
    isActive
      ? `color: #fff;
         background-color: var(--primary-400);
         border-radius: var(--border-radius);`
      : null}
`

const MobileMenuButton = ({navRef}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    navRef.current.style.transform = `translateX(${isOpen ? '0px' : '-100vw'})`
  }, [isOpen, navRef])

  return isOpen ? (
    <Button
      variant="icon"
      css={css`
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 2;
      `}
      onClick={handleClick}
    >
      <DeclineIcon fill="#000" />
    </Button>
  ) : (
    <Button
      variant="icon"
      css={css`
        position: absolute;
        bottom: 1.5rem;
        right: 1.5rem;
        background-color: #21bf73;
        color: #fff;
      `}
      onClick={handleClick}
    >
      <MenuIcon />
    </Button>
  )
}

MobileMenuButton.propTypes = {
  navRef: PropTypes.object.isRequired,
}

const NavbarContainer = () => {
  const navRef = React.useRef()
  const {isMobile} = useDimentions()

  return (
    <>
      {isMobile ? <MobileMenuButton navRef={navRef} /> : null}
      <Nav ref={navRef}>
        <Navbar>
          <NavbarItem isActive>Overview</NavbarItem>
          <NavbarItem>Movimientos</NavbarItem>
          <NavbarItem>Reportes</NavbarItem>
        </Navbar>
      </Nav>
    </>
  )
}

export {NavbarContainer as Navbar}
