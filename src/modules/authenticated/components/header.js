/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Button, Small} from 'common-components'
import {formatDate} from 'common-utils'
import {useAuth} from 'context/auth'
import {RefreshIcon, LogoutIcon} from 'icons'

const Refresh = ({handleRefresh}) => (
  <Button variant="secondary" onClick={handleRefresh}>
    <RefreshIcon fill="var(--primary-400)" />
  </Button>
)

Refresh.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
}

const Logout = ({logout}) => (
  <Button onClick={logout}>
    <LogoutIcon />
  </Button>
)

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
}

const Header = () => {
  const {user, logout} = useAuth()
  const handleRefresh = () => {
    const keys = Object.keys(localStorage)
    keys
      .filter(k => !k.includes('gotrue.user'))
      .forEach(k => {
        localStorage.setItem(k, null)
      })
    window.location.reload()
  }
  return (
    <header
      css={css`
        grid-area: header;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div>
        <h1>{user.name}</h1>
        <Small>{formatDate(Date.now())}</Small>
      </div>
      <div
        css={css`
          gap: 1rem;
          display: flex;
        `}
      >
        <Refresh handleRefresh={handleRefresh} />
        <Logout logout={logout} />
      </div>
    </header>
  )
}

export {Header}
