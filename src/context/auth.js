import * as React from 'react'
import GoTrue from 'gotrue-js'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const auth = new GoTrue({
  APIUrl: process.env.NETLIFY_IDENTITY_URL,
})

const statusCodes = {
  resolved: 'resolved',
  pending: 'pending',
  error: 'error',
}

const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState()
  const [status, setStatus] = React.useState(statusCodes.resolved)

  const login = React.useCallback(async (username, password) => {
    try {
      setStatus(statusCodes.pending)
      const {
        user_metadata: {full_name: name},
        app_metadata: {roles},
      } = await auth.login(username, password)
      setUser({name, roles})
      setStatus(statusCodes.resolved)
    } catch (e) {
      console.error('error', e)
      setStatus(statusCodes.error)
    }
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      login,
    }),
    [user, login]
  )

  if (status === statusCodes.pending || status === statusCodes.error) {
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
