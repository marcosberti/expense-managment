/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {RentIcon, FitnessIcon, SchoolIcon} from 'icons'
import * as mq from 'media-queries'
import {Category} from './category'

// TODO: fetch data from db
const categorias = [
  {
    name: 'Alquiler',
    ammount: 66666,
    icon: RentIcon,
  },
  {name: 'Deporte', ammount: 3454, icon: FitnessIcon},
  {name: 'Cursos', ammount: 4700, icon: SchoolIcon},
]

const CategoriesTitle = () => (
  <h2
    css={css`
      font-weight: 600;
      color: var(--text-color-light);
    `}
  >
    Categorias con mas gastos
  </h2>
)

const CategoriesList = ({children}) => (
  <div
    css={css`
      --category-size: 10rem;
      --category-margin-right: 1.5rem;
      --category-padding: 1rem;

      overflow-x: auto;
      width: 100%;

      ${mq.large} {
        --category-size: 12rem;
      }
    `}
  >
    <ul
      css={css`
        width: calc(
          (var(--category-size) * ${categorias.length}) +
            (var(--category-margin-right) * ${categorias.length - 1})
        );
        display: flex;
      `}
    >
      {children}
    </ul>
  </div>
)

CategoriesList.propTypes = {
  children: PropTypes.array,
}

const Categories = () => {
  console.error('si categorias esta vacia, hacer un category de placeholder')
  console.error('cata categoria con su color, si no con uno por defecto')
  return (
    <div>
      <CategoriesTitle />
      <CategoriesList>
        {categorias.map(categoria => (
          <Category key={JSON.stringify(categoria)} data={categoria} />
        ))}
      </CategoriesList>
    </div>
  )
}

export {Categories}
