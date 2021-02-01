/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'

const Header = ({user}) => (
  <header
    css={css`
      grid-area: header;
      padding: 1rem;
    `}
  >
    <h1>{user.name}</h1>
    <small
      css={css`
        color: #777;
      `}
    >
      {new Intl.DateTimeFormat('es-AR', {dateStyle: 'medium'}).format(
        Date.now()
      )}
    </small>
  </header>
)

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export {Header}
