/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {DataProvider} from 'context/data'
import {MutateProvider} from 'context/mutate'
import {Navbar} from './components/navbar'
import {Header} from './components/header'
import {Routes} from './components/routes'

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

const Authenticated = () => (
  <Grid>
    <Navbar />
    <Header />
    <DataProvider>
      <MutateProvider>
        <Routes />
      </MutateProvider>
    </DataProvider>
  </Grid>
)

export {Authenticated}
