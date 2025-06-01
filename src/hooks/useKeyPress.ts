import { useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'

export enum KEYS {
  WIN = 'Meta',
  SCROLL = 'ScrollLock',
  SPACEBAR = 'Spacebar',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DEL = 'Delete',
  ESC = 'Escape',
  ENTER = 'Enter',
}

// Fixing inconsistencies from older browsers
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const aliases = new Map([
  [KEYS.WIN, 'Meta'],

  [KEYS.SCROLL, 'ScrollLock'],
  [KEYS.SPACEBAR, ' '],

  [KEYS.DOWN, 'ArrowDown'],
  [KEYS.LEFT, 'ArrowLeft'],
  [KEYS.RIGHT, 'ArrowRight'],
  [KEYS.UP, 'ArrowUp'],
  [KEYS.DEL, 'Delete'],

  [KEYS.ESC, 'Escape'],
  [KEYS.ENTER, 'Enter'],
])

const shimKeyboardEvent = (event: any) => {
  if (aliases.has(event.key)) {
    const key = aliases.get(event.key)

    Object.defineProperty(event, 'key', {
      configurable: true,
      enumerable: true,
      get() {
        return key
      },
    })
  }
}

const useKeypress = (keys: KEYS, handler: any) => {
  invariant(
    Array.isArray(keys) || typeof keys === 'string',
    'Expected `keys` to be an array or string',
  )
  if (Array.isArray(keys)) {
    keys.forEach((key, i) => {
      invariant(
        typeof key === 'string',
        `Expected \`keys[${i}]\` to be a string`,
      )
    })
  }
  invariant(
    typeof handler === 'function' || handler == null,
    'Expected `handler` to be a function',
  )

  const eventListenerRef = useRef(null)

  useEffect(() => {
    ;(eventListenerRef as any).current = (event: any) => {
      shimKeyboardEvent(event)
      if (Array.isArray(keys) ? keys.includes(event.key) : keys === event.key) {
        handler?.(event)
      }
    }
  }, [keys, handler])

  useEffect(() => {
    const eventListener = (event: any) => {
      ;(eventListenerRef as any).current(event)
    }
    window.addEventListener('keydown', eventListener)
    return () => {
      window.removeEventListener('keydown', eventListener)
    }
  }, [])
}

export default useKeypress
