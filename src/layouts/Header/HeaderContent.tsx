import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title: string
}

const HeaderContent = ({ title, children }: Props) => {
  return (
    <div className="flex gap-x-4 items-center mb-8">
      <p className="font-semibold text-4xl">{title}</p>
      {children}
    </div>
  )
}

export default HeaderContent
