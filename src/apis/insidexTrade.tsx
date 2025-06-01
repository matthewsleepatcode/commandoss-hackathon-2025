import { APIResponse } from '@/type/api'
import { API } from './core'

export interface Token {
  coinMetadata: {
    coinType: string
    iconUrl: string
    symbol: string
    createdAt: number
  }

  coin1dTradeCount: number
  price: number
  fullyDilutedMarketCap: number
  holderScore: number
  totalLiquidityUsd: number
  uniqueTraders1d: number
  holdersCount: number
}

const getTokens = async () => {
  const res = await API.insidexTrade.get<null, APIResponse<Token[]>>(
    `/meme-coins/trending?liquidityRangeMin=10000&liquidityRangeMax=0&volumeRangeMin=0&volumeRangeMax=0&marketCapRangeMin=10000&marketCapRangeMax=0&hideLstCoins=true&hideStableCoins=true`,
  )

  if (!res.success) {
    throw new Error(res.message || 'fetch ERROR')
  }

  return res.data
}

export default { getTokens }
