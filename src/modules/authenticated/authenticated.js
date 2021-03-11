/** @jsxImportSource @emotion/react */
import {BrowserRouter as Router} from 'react-router-dom'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {DataProvider} from 'context/data'
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
  children: PropTypes.element.isRequired,
}

const Authenticated = () => (
  <Grid>
    <Router>
      <Navbar />
      <Header />
      <DataProvider>
        <Routes />
      </DataProvider>
    </Router>
  </Grid>
)

export {Authenticated}
