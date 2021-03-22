/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {ItemIcon} from 'common-components'
import {AddCategory} from './add-cateory'

const MovementCategories = ({fields, onAddCat}) => (
  <>
    <p>Categorias</p>
    <ul
      css={css`
        gap: 0.25rem;
        display: flex;
      `}
    >
      {fields.map(f => (
        <li
          key={f.nombre}
          css={css`
            width: var(--category-size);
            height: var(--category-size);
          `}
        >
          <ItemIcon
            icon={f.icon}
            size={32}
            description={f.nombre}
            color={f.color}
          />
        </li>
      ))}
      <AddCategory onAddCat={onAddCat} />
    </ul>
  </>
)

MovementCategories.propTypes = {
  fields: PropTypes.array.isRequired,
  onAddCat: PropTypes.func.isRequired,
}

export {MovementCategories}
