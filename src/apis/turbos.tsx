import { APIResponse } from '@/type/api'
import { API } from './core'

const getTVL = async () => {
  const res = await API.turbos.get<null, APIResponse<any>>(`/tvl`)

  if (!res.success) {
    throw new Error(res.message || 'fetch ERROR')
  }

  return res.data
}

const getStatistic = async () => {
  const res = await API.turbos.get<null, APIResponse<any>>(`/statistics`)

  if (!res.success) {
    throw new Error(res.message || 'fetch ERROR')
  }

  return res.data
}

const getTopTokens = async () => {
  const res = await API.turbos.get<null, APIResponse<any>>(
    `/tokens?orderBy=tvl&orderType=desc&page=1&pageSize=10`,
  )

  if (!res.success) {
    throw new Error(res.message || 'fetch ERROR')
  }

  return res.data
}

const getTopPools = async () => {
  const res = await API.turbos.get<null, APIResponse<any>>(
    `/pools?orderBy=tvl&orderType=desc&page=1&pageSize=10`,
  )

  if (!res.success) {
    throw new Error(res.message || 'fetch ERROR')
  }

  return res.data
}

export default { getStatistic, getTVL, getTopPools, getTopTokens }
