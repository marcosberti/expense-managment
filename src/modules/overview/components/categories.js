/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Category} from './category'
import {RentIcon, FitnessIcon, SchoolIcon} from '../../../assets/icons'
import * as mq from '../../../styles/media-queries'

// TODO: fetch data from db
const categorias = [
  {
    name: 'Alquiler',
    ammount: 24000,
    icon: RentIcon,
  },
  {name: 'Deporte', ammount: 1000, icon: FitnessIcon},
  {name: 'Educación', ammount: 4700, icon: SchoolIcon},
]

const Categories = () => (
  <div
    css={css`
      --category-size: 10rem;
      --category-margin-right: 1.5rem;
      --category-padding: 1rem;

      overflow-x: auto;
      width: 100vw;

      ${mq.large} {
        --category-size: 12rem;
      }
    `}
  >
    {console.log('mirar comentario')}
    <ul
      css={css`
        width: calc(
          (var(--category-size) * ${categorias.length}) +
            (var(--category-margin-right) * ${categorias.length - 1}) + 2rem
        );
        display: flex;
      `}
    >
      {categorias.map(categoria => (
        <Category key={JSON.stringify(categoria)} data={categoria} />
      ))}
    </ul>
  </div>
)

export {Categories}
