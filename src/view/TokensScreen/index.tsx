'use client'
import HeaderContent from '@/layouts/Header/HeaderContent'
import React, { useEffect, useState } from 'react'
import TokensTable from './_components/TokensTable'
import { useQueryTokens } from '@/hooks/tokens/useQueryTokens'
import axios from 'axios'
import { Token } from '@/apis/insidexTrade'

const TokensScreen = () => {
  const [data, setData] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        'https://spot.api.sui-prod.bluefin.io/api/insidex/meme-coins/trending?hideLstCoins=true&hideStableCoins=true&liquidityRangeMax=0&liquidityRangeMin=10000&marketCapRangeMax=0&marketCapRangeMin=10000&volumeRangeMax=0&volumeRangeMin=0',
      )

      setData(res.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section>
      <HeaderContent title="Tokens"></HeaderContent>
      <TokensTable dataTable={data} isLoading={isLoading} />
    </section>
  )
}

export default TokensScreen
