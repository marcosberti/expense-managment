/** @jsxImportSource @emotion/react */
import {BrowserRouter as Router} from 'react-router-dom'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {useAuth} from 'context/auth'
import * as React from 'react'
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

const Authenticated = () => {
  const {user} = useAuth()

  React.useEffect(() => {
    const run = async () => {
      const dateISO = new Date().toISOString()
      try {
        const res = await fetch(
          `http://localhost:8888/.netlify/functions/get-overview?date=${dateISO}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        ).then(r => {
          if (!r.ok) {
            throw r
          }
          return r.json()
        })

        console.log(res)
      } catch (e) {
        const msg = await e.json()
        console.log(e, msg)
      }
    }

    run()
  }, [])

  return (
    <Grid>
      <Router>
        <Navbar />
        <Header />
        <Routes />
      </Router>
    </Grid>
  )
}

export {Authenticated}
