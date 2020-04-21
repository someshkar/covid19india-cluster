const defaultOption = {
  cors: 'no-cors',
  method: 'GET',
  redirect: 'follow',
}
export const isDev = process && process.env.NODE_ENV === 'development'

export async function getAPIData(url, options = defaultOption) {
  const response = await fetch(url, options)
  const payload = await response.json()
  return payload['data'] ? payload['data'] : payload
}

// All export
export * from './googleAnalytics'
export * from './logger'
export * from './parse'
export * from './debounce'
export * from './filters'
export * from './normalize'