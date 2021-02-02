/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Categories} from './categories'

const Overview = () => (
  <div
    css={css`
      padding: 1rem;
    `}
  >
    <h2
      css={css`
        font-weight: 600;
        color: var(--text-color-light);
      `}
    >
      Categorias con mas gastos
    </h2>
    <Categories />
  </div>
)

export {Overview}
