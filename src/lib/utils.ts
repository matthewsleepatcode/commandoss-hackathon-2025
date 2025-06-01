import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { twMerge } from 'tailwind-merge'
import _merge from 'lodash/merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const objectToQueryString = (
  obj: Record<string, any>,
  currentSearch?: ReadonlyURLSearchParams,
  defaultValues?: Record<string, unknown>,
) => {
  const prev = currentSearch ? queryString.parse(currentSearch.toString()) : {}
  const queryObject = removeEmpty(_merge(prev, obj))
  if (defaultValues) {
    // Remove query that same as default value
    Object.keys(defaultValues).forEach((key) => {
      if (queryObject[key] === defaultValues[key]) {
        delete queryObject[key]
      }
    })
  }
  return queryString.stringify(queryObject)
}

export const removeEmpty = (obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== '' && v !== null && v !== undefined,
    ),
  )

export const searchParamsToObj = (
  searchParams: ReadonlyURLSearchParams,
  options?: queryString.ParseOptions,
) => {
  return queryString.parse(searchParams.toString(), options) as Record<
    string,
    unknown
  >
}
