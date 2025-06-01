'use client'

import React, { PropsWithChildren } from 'react'
import LandingPageLayout from '@/layouts/LandingPageLayout'
import { WalletProvider } from '@suiet/wallet-kit'
import '@suiet/wallet-kit/style.css'
import HeaderNav from '@/layouts/Header/HeaderNav'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <WalletProvider>
      <LandingPageLayout>
        <HeaderNav />
        {children}
      </LandingPageLayout>
    </WalletProvider>
  )
}

export default Layout
