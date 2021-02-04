/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Small} from '../../common/components'
import {formatDate} from '../../common/utils/utils'

const Header = ({user}) => (
  <header
    css={css`
      grid-area: header;
      padding: 1rem;
    `}
  >
    <h1>{user.name}</h1>
    <Small>{formatDate(Date.now())}</Small>
  </header>
)

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export {Header}
