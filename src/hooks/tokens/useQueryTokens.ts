import { useQuery } from '@tanstack/react-query'
import InsidexTradeAPI, { Token } from '@/apis/insidexTrade'

export const useQueryTokens = () => {
  const query = useQuery<Token[]>({
    // not set type here
    queryKey: ['trending'],
    queryFn: async () => {
      const tokens = await InsidexTradeAPI.getTokens()
      return tokens
    },
    staleTime: 10_000,
  })

  return {
    isLoading: query.isFetching,
    data: query.data || [],
  }
}
