import { format } from 'date-fns'
import lowerCase from 'lodash/lowerCase'

export function timeFormatUtc(
  timestamp: number | undefined | Date | string,
  pattern = 'PP K:mm a',
) {
  if (!timestamp) return timestamp

  const dateLocal = new Date(timestamp)

  // return format(addMinutes(dateLocal, dateLocal.getTimezoneOffset()), pattern)
  return format(dateLocal, pattern)
}

export const formatAddress = (addr: string, num = 5): string => {
  if (!addr || !addr.split) {
    return '...'
  }

  const min = num
  const isShorten = addr.length <= min
  if (isShorten) return addr
  return `${addr.slice(0, num)}...${addr.slice(-1 * num)}`
}

export const formatText = (s?: string) => {
  if (typeof s !== 'string' || !s || s.length == 0) return ''

  return s.charAt(0).toUpperCase() + lowerCase(s.slice(1))
}
