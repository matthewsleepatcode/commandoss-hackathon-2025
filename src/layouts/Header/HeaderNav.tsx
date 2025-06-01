import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  isIntro?: boolean
}
const HeaderNav = ({ isIntro = false }: Props) => {
  return (
    <nav
      className={cn(
        'fixed w-screen p-[1em] flex gap-[2em] [&>*]:flex-1 font-semibold border-b bg-transparent z-10',
        isIntro ? 'nav border-none' : 'bg-white',
      )}
      suppressHydrationWarning
    >
      <div
        className={cn(
          'flex justify-around items-center',
          '[@media(max-width:768px)]:hidden',
          isIntro && 'links',
        )}
      >
        <a href="/dapps">Top DApps</a>
        <a href="/tokens">Top Tokens</a>
      </div>
      <div className={cn('text-center flex justify-center')}>
        <a href="/">
          CommandOSS <br /> Hackathon <br /> 2025
        </a>
      </div>
      <div
        className={cn(
          'flex justify-around items-center',
          '[@media(max-width:768px)]:hidden',
          isIntro && 'links',
        )}
      >
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  )
}

export default HeaderNav
