import * as React from 'react'
import {useAuth} from 'context/auth'

const objectToQueryString = obj =>
  Object.keys(obj)
    .map(
      key =>
        `${key}=${
          typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key])
        }`
    )
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
    console.log('e', e)
    /**
     * if e.statusCode === 401
     * await refresh() // comes from params
     * // retry
     * request(path,method, headers, params)
     * else
     */
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

const STATUS_PENDING = 'pending'
const STATUS_REJECTED = 'rejected'
const STATUS_RESOLVED = 'resolved'
const STATUS_CREATED = 'created'
const STATUS_STORAGE = 'storage'
const STORAGE_KEY = 'expman-data'

const getFromStorage = path => JSON.parse(localStorage.getItem(path))

const saveToStorage = (path, data) =>
  localStorage.setItem(path, JSON.stringify(data))

const reducer = (state, action) => {
  if (action.type === STATUS_PENDING) {
    return {
      status: STATUS_PENDING,
      data: state.data,
    }
  }
  if (action.type === STATUS_REJECTED) {
    return {
      status: STATUS_REJECTED,
      error: action.error,
    }
  }
  if (action.type === STATUS_RESOLVED) {
    const data = {...state.data, ...action.data}
    saveToStorage(STORAGE_KEY, data)
    return {
      status: STATUS_RESOLVED,
      data,
    }
  }
  if (action.type === STATUS_STORAGE) {
    return {
      status: STATUS_RESOLVED,
      data: action.data,
    }
  }
  if (action.type === STATUS_CREATED) {
    const data = {
      ...state.data,
      [action.updateKey]: [...state.data[action.updateKey], action.data],
    }
    saveToStorage(STORAGE_KEY, data)

    return {
      status: STATUS_RESOLVED,
      data,
    }
  }

  throw new Error('Unhandled action')
}

const initialState = {
  status: STATUS_PENDING,
  data: {},
}

const useClient = () => {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const {data, status, error} = state

  const get = React.useCallback(
    async (endpoint, {headers = {}, params} = {}) => {
      const alreadyFetched = getFromStorage(endpoint)
      if (alreadyFetched) {
        const storageData = getFromStorage(STORAGE_KEY)
        dispatch({type: STATUS_STORAGE, data: storageData})
        return
      }

      dispatch({type: STATUS_PENDING})
      const _headers = {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
        ...headers,
      }

      const result = await request(endpoint, 'GET', _headers, params)
      if (result.error) {
        dispatch({
          type: STATUS_REJECTED,
          error: result.error,
        })
        return
      }

      saveToStorage(endpoint, true)
      dispatch({
        type: STATUS_RESOLVED,
        data: result.data,
      })
    },
    [user.token]
  )

  const post = React.useCallback(
    async (path, {headers = {}, params}, updateKey) => {
      dispatch({type: STATUS_PENDING})
      const _headers = {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
        ...headers,
      }

      const result = await request(path, 'POST', _headers, params)
      if (result.error) {
        dispatch({
          type: STATUS_REJECTED,
          error: result.error,
        })
        return
      }

      dispatch({
        type: STATUS_CREATED,
        data: result.data,
        updateKey,
      })
    },
    [user.token]
  )

  return {
    isPending: status === STATUS_PENDING,
    isRejected: status === STATUS_REJECTED,
    isResolved: status === STATUS_RESOLVED,
    data,
    error,
    get,
    post,
  }
}

export {useClient}
