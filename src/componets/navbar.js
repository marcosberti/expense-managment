/** @jsxImportSource @emotion/react */
import * as React from 'react'
import PropTypes from 'prop-types'
import {css} from '@emotion/react'
import {useMobile} from '../hooks/useMobile'
import * as mq from '../styles/media-queries'
import {MenuIcon, DeclineIcon} from '../assets/icons/index'

const Navbar = ({children}) => (
  <ul
    css={css`
      list-style: none;
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
    `}
  >
    {children}
  </ul>
)

Navbar.propTypes = {
  children: PropTypes.array.isRequired,
}

const getItemActive = isActive =>
  isActive
    ? css`
        color: #fff;
        background-color: #21bf73;
        border-radius: 10px;
      `
    : null

const NavbarItem = ({isActive, children}) => (
  <li
    css={css`
      font-weight: 500;
      letter-spacing: 1px;
      ${getItemActive(isActive)}
    `}
  >
    {children}
  </li>
)

NavbarItem.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.any.isRequired,
}

NavbarItem.defaultProps = {
  isActive: false,
}

const MobileMenuButton = ({navRef}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    navRef.current.style.transform = `translateX(${isOpen ? '0px' : '-100vw'})`
  }, [isOpen, navRef])

  return isOpen ? (
    <button
      type="button"
      css={css`
        position: absolute;
        width: 50px;
        height: 50px;
        top: 1rem;
        right: 1rem;
        z-index: 1;
        background-color: inherit;
      `}
      onClick={handleClick}
    >
      <DeclineIcon fill="#000" />
    </button>
  ) : (
    <button
      type="button"
      css={css`
        position: absolute;
        bottom: 1.5rem;
        right: 1.5rem;
        min-height: 70px;
        min-width: 70px;
        border-radius: 50%;
        background-color: #21bf73;
        color: #fff;
      `}
      onClick={handleClick}
    >
      <MenuIcon />
    </button>
  )
}

MobileMenuButton.propTypes = {
  navRef: PropTypes.object.isRequired,
}

const NavbarContainer = () => {
  const navRef = React.useRef()
  const isMobile = useMobile()

  return (
    <>
      {isMobile && <MobileMenuButton navRef={navRef} />}
      <nav
        ref={navRef}
        css={css`
          background-color: #fff;
          height: 100vh;
          width: 100vw;
          position: absolute;
          transition: transform 0.5s ease;
          transform: translateX(-100vw);

          ${mq.large} {
            transform: none;
            position: static;
            width: 15vw;
            border-right: 1px solid #adadad;
          }
        `}
      >
        <Navbar>
          <NavbarItem isActive>Overview</NavbarItem>
          <NavbarItem>Movimientos</NavbarItem>
          <NavbarItem>Reportes</NavbarItem>
        </Navbar>
      </nav>
    </>
  )
}

export {NavbarContainer as Navbar}
