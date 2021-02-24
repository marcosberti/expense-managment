import * as React from 'react'
import GoTrue from 'gotrue-js'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const auth = new GoTrue({
  APIUrl: process.env.NETLIFY_IDENTITY_URL,
})

const STATUS_RESOLVED = 'resolved'
const STATUS_PENDING = 'pending'
const STATUS_ERROR = 'error'

const getUserInfo = user => {
  const {
    user_metadata: {full_name: name},
    app_metadata: {roles},
  } = user

  return {name, roles}
}

const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState()
  const [{status, error}, setStatus] = React.useState(STATUS_RESOLVED)

  const login = React.useCallback(async (username, password) => {
    try {
      setStatus({status: STATUS_PENDING})
      const userData = await auth.login(username, password, true)
      setUser(getUserInfo(userData))
      setStatus({status: STATUS_RESOLVED})
    } catch (e) {
      setStatus({status: STATUS_ERROR, error: e})
    }
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      login,
    }),
    [user, login]
  )

  const currUser = auth.currentUser()
  if (currUser && !user) {
    setUser(getUserInfo(currUser))
  }

  if (status === STATUS_PENDING || status === STATUS_ERROR) {
    console.error('error', error, 'que hago con los errores al loguearse')
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}
