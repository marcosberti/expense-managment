import {BrowserRouter as Router} from 'react-router-dom'
import {GlobalStyles} from './styles/global-styles'
import {useAuth} from './context/auth'
import {Authenticated} from './modules/authenticated/authenticated'
import {Unauthenticated} from './modules/unauthenticated/unauthenticated'

const App = () => {
  const {user} = useAuth()

  return (
    <>
      <GlobalStyles />
      {user ? (
        <Router>
          <Authenticated />
        </Router>
      ) : (
        <Unauthenticated />
      )}
    </>
  )
}

export {App}
