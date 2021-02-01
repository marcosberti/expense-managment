/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'

const options = {style: 'currency', currency: 'ARS'}

const Category = ({data: {name, ammount, icon: Icon}}) => (
  <li
    css={css`
      padding: 1rem;
      margin-right: 1.5rem;
      background-color: #fff;
      border-radius: 8px;
      width: 10rem;
      height: 10rem;
    `}
  >
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      `}
    >
      <Icon fill="#333" size={84} />
      <div
        css={css`
          padding-left: 10px;
        `}
      >
        <div
          css={css`
            font-weight: 300;
          `}
        >
          {name}
        </div>
        <span
          css={css`
            font-weight: 500;
            font-size: 1.2em;
          `}
        >
          {ammount.toLocaleString('es-AR', options)}
        </span>
      </div>
    </div>
  </li>
)

Category.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    ammount: PropTypes.number,
    icon: PropTypes.func,
  }),
}

export {Category}
