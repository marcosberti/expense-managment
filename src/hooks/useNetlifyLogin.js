import * as React from 'react'
import GoTrue from 'gotrue-js'

const auth = new GoTrue({
  APIUrl: process.env.NETLIFY_IDENTITY_URL,
})

const STATUS_RESOLVED = 'resolved'
const STATUS_PENDING = 'pending'
const STATUS_ERROR = 'error'

const getUserInfo = user => {
  const {
    email: mail,
    token: {access_token: token},
    user_metadata: {full_name: name},
    app_metadata: {roles},
  } = user

  return {name, roles, mail, token}
}
const getCurrentUser = () => {
  const user = auth.currentUser()
  return user ? getUserInfo(user) : null
}

const useNetlifyLogin = () => {
  const current = getCurrentUser()
  const [user, setUser] = React.useState(current)
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

  const logout = React.useCallback(async () => {
    await auth.currentUser().logout()
    localStorage.clear()
    setUser(null)
  }, [])

  const refresh = React.useCallback(async () => {
    await auth.currentUser().jwt(true)
    setUser(getCurrentUser())
  }, [])

  return {
    user,
    login,
    logout,
    refresh,
    error,
    isPending: status === STATUS_PENDING,
    isRejected: status === STATUS_ERROR,
  }
}

export {useNetlifyLogin}
