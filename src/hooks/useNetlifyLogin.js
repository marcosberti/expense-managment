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
    user_metadata: {full_name: name},
    app_metadata: {roles},
  } = user

  return {name, roles}
}

const useNetlifyLogin = () => {
  const currentUser = auth.currentUser()
  const [user, setUser] = React.useState(currentUser)
  const [{status, error}, setStatus] = React.useState(STATUS_RESOLVED)

  const login = React.useCallback(async (username, password) => {
    try {
      setStatus({status: STATUS_PENDING})
      const userData = await auth.login(username, password, true)
      console.log('userData', userData)
      setUser(getUserInfo(userData))

      setStatus({status: STATUS_RESOLVED})
    } catch (e) {
      setStatus({status: STATUS_ERROR, error: e})
    }
  }, [])

  return {
    user,
    login,
    error,
    isPending: status === STATUS_PENDING,
    isRejected: status === STATUS_ERROR,
  }
}

export {useNetlifyLogin}
