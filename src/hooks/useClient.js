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

const getClient = token => {
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const client = async (endpoint, {body, params, ...customConfig} = {}) => {
    const config = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...authHeaders,
        ...customConfig.headers,
      },
    }
    if (body) {
      config.body = JSON.stringify(body)
    }

    const finalEndpoint =
      config.method === 'GET'
        ? `${endpoint}?${objectToQueryString(params)}`
        : endpoint

    try {
      const url = `${process.env.NETLIFY_FUNCTIONS_ENDPOINT}/${finalEndpoint}`
      const response = await fetch(url, config)
      if (response.status === 401) {
        console.log('401 unauthirazed')
      }
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return {data}
    } catch (e) {
      const {status, statusText, message} = e
      return {
        error: {
          status,
          message: `${statusText}: ${message}`,
        },
        data: null,
      }
    }
  }

  return client
}

const useClient = () => {
  const {user} = useAuth()
  const [client, setClient] = React.useState(() => getClient(user.token))

  // React.useEffect(() => {
  //   console.log('in client eff')
  //   setClient(() => getClient(user.token))
  // }, [user])

  return client
}

export {useClient}
