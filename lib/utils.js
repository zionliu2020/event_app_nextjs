import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import queryString from 'query-string'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const handleError = (error) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const convertFileToUrl = (file) => URL.createObjectURL(file)

export function formUrlQuery({ params, key, value }) {
  const currentUrl = queryString.parse(params)

  currentUrl[key] = value
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  )
}

export function removeKeysFromQuery({ params, keysToRemove }) {
  const currentUrl = queryString.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
