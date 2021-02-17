/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {Navbar} from './modules/authenticated/components/navbar'
import {Header} from './modules/authenticated/components/header'
import {Overview} from './modules/overview/components/overview'
import {Movements} from './modules/movements/movements'

const Grid = ({children}) => (
  <main
    css={css`
      width: 100%;
      height: 100%;
      overflow: hidden;

      ${mq.large} {
        display: grid;
        grid-template-columns: 15rem 1fr;
        grid-template-rows: var(--header-size) 1fr;
        grid-template-areas:
          'navbar header'
          'navbar content';
      }
    `}
  >
    {children}
  </main>
)

Grid.propTypes = {
  children: PropTypes.array.isRequired,
}

const Authenticated = () => {
  const user = {name: 'Marcos Bertilotti'}
  return (
    <Grid>
      <Navbar />
      <Header user={user} />
      {/* <Overview /> */}
      <Movements />
    </Grid>
  )
}

export {Authenticated}
