/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Category} from './category'
import {RentIcon, FitnessIcon, SchoolIcon} from '../../../assets/icons'

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
  <div>
    <ul
      css={css`
        display: flex;
        padding-left: 2rem;
        padding-top: 2rem;
      `}
    >
      {categorias.map(categoria => (
        <Category key={JSON.stringify(categoria)} data={categoria} />
      ))}
    </ul>
  </div>
)

export {Categories}
