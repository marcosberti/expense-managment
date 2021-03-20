/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {Link} from 'react-router-dom'
import {useData} from 'context/data'
import * as mq from 'media-queries'
import {CategoryItem, DesktopOnly, List, Small} from 'common-components'
import {MainOverview} from './components/main-overview'
import {DetailOverview} from './components/detail-overview'

const Charts = () => (
  <div
    css={css`
      border-radius: var(--border-radius);
      background-color: var(--background-color-light);

      ${mq.large} {
        display: flex;
        flex-direction: row;
      }
    `}
  >
    <DetailOverview />
    <MainOverview />
  </div>
)

const NoCategories = () => (
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
    <Small>
      Puede crear categorias en la sección{' '}
      <Link to="/movements">'Movimientos'</Link>
    </Small>
  </div>
)
const Categories = () => {
  // const {categorias} = useData()
  const catMasGastos = []

  return (
    <DesktopOnly>
      <div>
        <List
          title="Categorías con mas gastos"
          items={catMasGastos}
          itemComponent={CategoryItem}
          listNoItems={<NoCategories />}
          listProps={{
            gap: '1rem',
          }}
        />
      </div>
    </DesktopOnly>
  )
}

const Overview = () => (
  <div
    css={css`
      padding: 1rem;

      ${mq.large} {
        gap: 1rem;
        display: grid;
        grid-template-rows: 1fr 15rem;
      }
    `}
  >
    <Charts />
    <Categories />
  </div>
)

export {Overview}
