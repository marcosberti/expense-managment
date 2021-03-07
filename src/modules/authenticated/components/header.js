/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Button, Small} from 'common-components'
import {formatDate} from 'common-utils'
import {useAuth} from 'context/auth'

const Logout = () => {
  const {logout} = useAuth()

  const handleClick = () => logout()

  return (
    <div>
      <Button onClick={handleClick}>logout</Button>
    </div>
  )
}

const Header = ({user}) => (
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
    <Logout />
  </header>
)

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export {Header}
