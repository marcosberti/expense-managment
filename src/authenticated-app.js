/** @jsxImportSource @emotion/react */
import {BrowserRouter as Router} from 'react-router-dom'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {Navbar} from './modules/authenticated/components/navbar'
import {Header} from './modules/authenticated/components/header'
import {Routes} from './modules/authenticated/components/routes'

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

const Authenticated = () => {
  const user = {name: 'Marcos Bertilotti'}
  return (
    <Grid>
      <Router>
        <Navbar />
        <Header user={user} />
        <Routes />
      </Router>
    </Grid>
  )
}

export {Authenticated}
