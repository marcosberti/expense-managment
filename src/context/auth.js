import * as React from 'react'
import PropTypes from 'prop-types'
import {useNetlifyLogin} from 'hooks'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const AuthProvider = ({children}) => {
  const {
    user,
    login,
    logout,
    refresh,
    error,
    isPending,
    isRejected,
  } = useNetlifyLogin()

  const value = React.useMemo(() => ({user, login, logout, refresh}), [
    login,
    user,
    logout,
    refresh,
  ])

  if (isRejected) {
    console.error('error', error, 'que hago con los errores al loguearse')
    return null
  }

  if (isPending) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}
