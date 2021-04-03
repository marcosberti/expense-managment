/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import * as mq from 'media-queries'
import {MenuIcon, DeclineIcon} from 'icons'
import {Button, MobileOnly} from 'common-components'

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
`

const NavbarItem = styled.li`
  font-weight: 500;
  margin-top: 0.5rem;
  transition: transform 0.25s ease, background-color 0.5s ease, color 0.25s ease;
  border-radius: var(--border-radius);

  &:hover {
    transform: translateY(-2px);
  }

  &:first-of-type {
    margin-top: 150px;
  }

  & > * {
    letter-spacing: 1px;
    padding: 1rem;
    display: block;
    text-decoration: none;
    color: var(--text-color);
  }

  ${({active = false}) =>
    active
      ? `
          background-color: var(--primary-400);
          & > a {
            color: #fff;
          }
         `
      : null};
  ${({disabled = false}) =>
    disabled
      ? `
          & > * {
            color: var(--neutral-300);
            cursor: default;

          } 
          &:hover {
            transform: none;
          }
        `
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
      variant="mobileMenuIcon"
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
      variant="mobileMenuIcon"
      css={css`
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background-color: var(--primary-400);
        box-shadow: 0px 0px 5px 3px #0000005c;
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

const routes = [
  {path: '/', text: 'Overview'},
  {path: '/movements', text: 'Movimientos'},
  {path: '/expenses', text: 'Gastos'},
  {path: '/reports', text: 'Reportes', disabled: true},
]

const NavbarContainer = () => {
  const navRef = React.useRef()
  const {pathname} = useLocation()

  return (
    <>
      <MobileOnly>
        <MobileMenuButton navRef={navRef} />
      </MobileOnly>
      <Nav ref={navRef}>
        <Navbar>
          {routes.map(route => (
            <NavbarItem
              key={route.path}
              active={route.path === pathname}
              disabled={route.disabled}
            >
              {route.disabled ? (
                <span>{route.text}</span>
              ) : (
                <Link to={route.path}>{route.text}</Link>
              )}
            </NavbarItem>
          ))}
        </Navbar>
      </Nav>
    </>
  )
}

export {NavbarContainer as Navbar}
