import Cookies from 'js-cookie'

export const LOCAL_KEY = {
  USER: 'user',
  REGISTER: 'register',
  ORGANIZATION_ID: 'organization_id',
}

export const getLocalStorage = (key: string) => {
  // if (!isClient) return null;
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch (error) {
    return null
  }
}

export const setLocalStorage = (key: string, value: any) => {
  // if (!IS_DE) return;
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const getCookie = (key: string) => {
  try {
    const value = JSON.parse(Cookies.get(key) as string)
    if (value === 'undefined') return // fix for "undefined" string

    return JSON.parse(Cookies.get(key) as string)
  } catch (e) {
    return
  }
}

export const setCookie = (
  key: string,
  value: any,
  expires: number | Date = 365,
) => {
  Cookies.set(key, JSON.stringify(value), {
    expires: expires,
  })
}

export const removeCookie = (key: string) => {
  Cookies.remove(key)
}
