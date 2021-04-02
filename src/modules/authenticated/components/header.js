/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Button, Small} from 'common-components'
import {formatDate} from 'common-utils'
import {useAuth} from 'context/auth'

const Logout = ({logout}) => (
  <div>
    <Button onClick={logout}>logout</Button>
  </div>
)

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
}

const Header = () => {
  const {user, logout} = useAuth()
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
      <Button
        onClick={() => {
          const keys = Object.keys(localStorage)
          keys
            .filter(k => !k.includes('gotrue.user'))
            .forEach(k => {
              localStorage.setItem(k, null)
            })
          window.location.reload()
        }}
      >
        clear
      </Button>
      <Logout logout={logout} />
    </header>
  )
}

export {Header}
