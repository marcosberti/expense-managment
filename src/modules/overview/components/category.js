/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {primary} from '../../../styles/colors'

const options = {style: 'currency', currency: 'ARS'}

const Category = ({data: {name, ammount, icon: Icon}}) => (
  <li
    css={css`
      padding: 1rem;
      margin-right: var(--category-margin-right);
      background-color: var(--background-color-light);
      border-radius: 8px;
      width: var(--category-size);
      height: var(--category-size);
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
      <Icon fill={primary[400]} size={84} />
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
