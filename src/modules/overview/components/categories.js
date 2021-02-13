/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import {Big, Small} from 'common-components'
import {RentIcon, FitnessIcon, SchoolIcon} from 'icons'
import * as mq from 'media-queries'
import {Category} from './category'

// TODO: fetch data from db
const categorias = [
  // {
  //   name: 'Alquiler',
  //   ammount: 66666,
  //   icon: RentIcon,
  // },
  // {name: 'Deporte', ammount: 3454, icon: FitnessIcon},
  // {name: 'Cursos', ammount: 4700, icon: SchoolIcon},
]

const CategoriesTitle = () => (
  <Big
    css={css`
      margin: 1.125rem 0;
    `}
  >
    Categorias con mas gastos
  </Big>
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

const SinCategorias = () => (
  <div
    css={css`
      font-style: italic;
    `}
  >
    <div
      css={css`
        color: var(--secondary-400);
        font-weight: 500;
      `}
    >
      Aún no se han creado categorias
    </div>
    <Small>Puede crear categorias en la sección 'Movimientos' (link)</Small>
  </div>
)

const Categories = () => {
  console.error('cada categoria con su color, si no con uno por defecto')
  return (
    <div>
      <CategoriesTitle />
      {categorias.length ? (
        <CategoriesList>
          {categorias.map(categoria => (
            <Category key={JSON.stringify(categoria)} data={categoria} />
          ))}
        </CategoriesList>
      ) : (
        <SinCategorias />
      )}
    </div>
  )
}

export {Categories}
