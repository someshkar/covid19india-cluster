const isDev = process && process.env.NODE_ENV === 'development'

export function useLog(data) {
  const log = console.log
  return isDev && typeof data === 'object' ? log({ ...data }) : log(...data)
}

export function useError(data) {
  const error = console.error
  return isDev && typeof data === 'object' ? error({ ...data }) : error(...data)
}

export function useWarn(data) {
  const warn = console.warn
  return isDev && typeof data === 'object' ? warn({ ...data }) : warn(...data)
}
