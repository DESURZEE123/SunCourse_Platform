import { get, set, unset } from 'lodash'
const localStorageKey = 'sunCourse'
const getLocalStorageStore: any = () => {
  if (!localStorage.getItem(localStorageKey)) {
    window.localStorage.setItem(localStorageKey, JSON.stringify({}))
  }
  return JSON.parse(window.localStorage.getItem(localStorageKey))
}
export const setItem = (path: string, value: any): void => {
  const currentStore = getLocalStorageStore()
  set(currentStore, path, value)
  window.localStorage.setItem(localStorageKey, JSON.stringify(currentStore))
}
export const removeItem = (path: string): void => {
  const currentStore = getLocalStorageStore()
  unset(currentStore, path)
  window.localStorage.setItem(localStorageKey, JSON.stringify(currentStore))
}
export const getItem = (path: string, defaultValue = ''): any => get(getLocalStorageStore(), path, defaultValue)
