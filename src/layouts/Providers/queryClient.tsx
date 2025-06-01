'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 2_000,
      refetchOnWindowFocus: false,
    },
  },
})

const QueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
