import React from 'react'
import RenderIf from './RenderIf'
import Spinner from './spinner'
import EmptyState from './empty-state'

interface Props {
  isLoading?: boolean
  data?: any
  children: React.ReactNode
  isEmpty?: boolean
}

const WrapContent = ({
  isLoading = false,
  data,
  children,
  isEmpty = false,
}: Props) => {
  return (
    <RenderIf.Group>
      <RenderIf condition={isLoading}>
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30">
          <Spinner />
        </div>
      </RenderIf>

      <RenderIf
        condition={(!Boolean(data) && typeof data !== 'undefined') || isEmpty}
      >
        <EmptyState isFullHeight />
      </RenderIf>
      <RenderIf condition>{children}</RenderIf>
    </RenderIf.Group>
  )
}

export default WrapContent
