import * as React from 'react'
import {useAuth} from 'context/auth'

const objectToQueryString = obj =>
  Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')

const request = async (path, method, headers, params) => {
  let url = `${process.env.NETLIFY_FUNCTIONS_ENDPOINT_LOCAL}/${path}`

  const options = {
    method,
    headers,
  }

  if (params) {
    if (method === 'GET') {
      url +=
        typeof params === 'string' ? params : `?${objectToQueryString(params)}`
    } else {
      options.body = JSON.stringify(params)
    }
  }

  try {
    const result = await fetch(url, options).then(r => {
      if (!r.ok) {
        throw r
      }
      return r.json()
    })

    return {data: result, error: null}
  } catch (e) {
    const {status, statusText} = e
    const {message} = await e.json()
    return {
      error: {
        status,
        message: `${statusText}: ${message}`,
      },
      data: null,
    }
  }
}

const STATE_PENDING = 'pending'
const STATE_REJECTED = 'rejected'
const STATE_RESOLVED = 'resolved'

const getFromStorage = path => JSON.parse(localStorage.getItem(path))

const saveToStorage = (path, data) =>
  localStorage.setItem(path, JSON.stringify(data))

const useClient = () => {
  const {user} = useAuth()
  const [{state, error, data}, setState] = React.useState({
    state: STATE_PENDING,
  })

  const run = React.useCallback(
    async (path, {method = 'GET', headers = {}, params} = {}) => {
      const storageData = getFromStorage(path)
      if (storageData) {
        setState({state: STATE_RESOLVED, data: storageData})
        return
      }
      setState({state: STATE_PENDING})
      const _headers = {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
        ...headers,
      }

      const result = await request(path, method, _headers, params)
      if (!result.error) {
        saveToStorage(path, result.data)
      }

      setState({
        state: result.error ? STATE_REJECTED : STATE_RESOLVED,
        ...result,
      })
    },
    [user.token]
  )

  return {
    isPending: state === STATE_PENDING,
    isRejected: state === STATE_REJECTED,
    isResolved: state === STATE_RESOLVED,
    data,
    error,
    run,
  }
}

export {useClient}
