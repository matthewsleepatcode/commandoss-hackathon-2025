'use client'

import React, { SyntheticEvent, useState, memo } from 'react'
import Image, { ImageProps } from 'next/image'
import { twMerge } from 'tailwind-merge'
import { formatURILink, isVideo as checkIsVideo } from '@/commons/function'
import { IS_LOCAL } from '@/commons/config'
import _ from 'lodash'
import { Skeleton } from '../ui/skeleton'

interface AssetMediaProps extends ImageProps {
  src: string
  alt: string
  defaultImage?: string
  imageClassName?: string
  isApiLoading?: boolean
  isCover?: boolean
  isVideo?: boolean
}

const AssetMedia = ({
  src = '',
  alt = 'pajily',
  className,
  imageClassName,
  defaultImage,
  isApiLoading,
  isCover,
  isVideo,
  ...props
}: AssetMediaProps) => {
  const formatSrc = formatURILink(src)
  const isVideoSrc = isVideo || checkIsVideo(formatSrc)

  const emptyImage = defaultImage || '/NFTDefault.svg'

  const [isError, setIsError] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleLoadError = (
    e: SyntheticEvent<HTMLImageElement | HTMLVideoElement>,
  ) => {
    if (isError) return

    e.currentTarget.src = emptyImage
    setIsError(true)
    setIsImageLoaded(true)
  }

  const handleLoadImage = () => {
    setIsImageLoaded(true)
  }

  if (!isError && isVideoSrc) {
    return (
      <MediaContainer className={className} isApiLoading={isApiLoading}>
        {!isApiLoading && (
          <video
            src={formatSrc}
            loop
            muted
            autoPlay
            playsInline
            onError={handleLoadError}
            className={twMerge(
              'object-cover absolute top-0 left-0 w-full h-full pointer-events-none select-none',
              imageClassName,
            )}
          />
        )}
      </MediaContainer>
    )
  }

  return (
    <MediaContainer className={className} isApiLoading={isApiLoading}>
      <>
        {!isApiLoading && (
          <Image
            src={isError || !formatSrc ? emptyImage : formatSrc}
            alt={alt}
            className={twMerge(
              'object-contain',
              isCover && 'object-cover',
              imageClassName,
            )}
            onError={handleLoadError}
            onLoad={handleLoadImage}
            fill
            quality={50}
            sizes="(max-width: 1200px) 200vw"
            data-aos={'fade'}
            {..._.merge(
              props,
              IS_LOCAL && {
                loader: () => src,
              },
            )}
          />
        )}
      </>
    </MediaContainer>
  )
}

const MediaContainer = ({
  children,
  className,
  isApiLoading,
}: {
  children: React.ReactNode
  className?: string
  isApiLoading?: boolean
}) => {
  return (
    <>
      <div className={twMerge('', className)}>
        {isApiLoading ? (
          <Skeleton className="w-full h-full !bg-subtle" />
        ) : (
          children
        )}
      </div>
    </>
  )
}

export default memo(AssetMedia)
