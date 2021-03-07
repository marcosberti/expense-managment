/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {css} from '@emotion/react'
import PropTypes from 'prop-types'
import * as mq from 'media-queries'
import {useAuth} from 'context/auth'
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

  // console.log('user', user)

  // React.useEffect(() => {
  //   const run = async () => {
  //     const endpoint = `${process.env.NETLIFY_FUNCTIONS_ENDPOINT_LOCAL}/get-data`
  //     try {
  //       const response = await fetch(endpoint, {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       })
  //       if (!response.ok) {
  //         throw response
  //       }
  //       console.log('response', response)
  //     } catch (e) {
  //       console.log('error', e, e)
  //       // const reader = e.body.getReader()
  //       // reader.read().then(({done, value}) => {
  //       //   console.log('value', value)
  //       //   if (done) {
  //       //     return
  //       //   }
  //       // })
  //     }
  //   }

  //   run()
  // }, [])

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
