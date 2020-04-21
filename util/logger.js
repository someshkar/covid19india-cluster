import { isDev } from './'

export function useLog(data) {
  const log = console.log
  return isDev
    ? typeof data === 'object'
      ? log({ ...data })
      : log(...data)
    : null
}

export function useError(data) {
  const error = console.error
  return isDev
    ? typeof data === 'object'
      ? error({ ...data })
      : error(...data)
    : null
}

export function useWarn(data) {
  const warn = console.warn
  return isDev
    ? typeof data === 'object'
      ? warn({ ...data })
      : warn(...data)
    : null
}
