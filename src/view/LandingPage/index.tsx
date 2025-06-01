'use client'

import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@suiet/wallet-kit'
import styled from 'styled-components'
import { cn } from '@/lib/utils'
import { initGsap } from './_commons/gsap'
import { baseClasses } from './_components/styled'
import HeaderNav from '@/layouts/Header/HeaderNav'

const LoaderTitle = styled.h1`
  background-clip: text;
  background: linear-gradient(0deg, #3a3a3a, #3a3a3a 50%, #fff, 0);
  background-size: 100% 200%;
  background-position: 0% 100%;
  color: #3a3a3a;
`

const ImgItem = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);

  img {
    border-radius: 1rem;
  }
`

const NavItem = styled.h1`
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
`

const LandingPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    initGsap()
  }, [mounted])

  if (!mounted) return <></>

  return (
    <div className="!font-semibold">
      <div className={baseClasses.overlay}>
        {/* overlay */}

        <div
          className={cn(
            baseClasses.boxContent,
            baseClasses.hiddenOnMobile,
            'projects',
          )}
        >
          {/* projects */}
          <div
            className={cn(
              baseClasses.boxContentHeader,
              `[&>*]:flex-1 projects-header`,
            )}
          >
            {/* projects_header */}
            <p className={cn(baseClasses.item)}>Project</p>
          </div>
        </div>

        {/* loader */}
        <div
          className={cn(
            baseClasses.boxContent,
            baseClasses.loader,
            // baseClasses.hiddenOnMobile,
            baseClasses.loaderMobile,
            'loader',
          )}
        >
          <LoaderTitle className={cn(baseClasses.loaderTitle, 'logo-line-1')}>
            {/* loader_logo */}
            CommandOSS
          </LoaderTitle>
          <LoaderTitle className={cn(baseClasses.loaderTitle, 'logo-line-2')}>
            Hackathon
          </LoaderTitle>
          <LoaderTitle className={cn(baseClasses.loaderTitle, 'logo-line-3')}>
            2025
          </LoaderTitle>
        </div>

        {/* locations */}
        <div
          className={cn(
            baseClasses.boxContent,
            baseClasses.hiddenOnMobile,
            `items-center justify-center locations`,
          )}
        >
          <div
            className={cn(
              baseClasses.boxContentHeader,
              `[&>*]:flex-1 locations-header`,
            )}
          >
            {/* locations_header */}

            <p className={cn(baseClasses.item)}>Location</p>
            {/* <ConnectButton>Connect</ConnectButton> */}
          </div>
        </div>
      </div>

      <div
        className={cn(
          baseClasses.gridImage,
          baseClasses.gridImageMobile,
          'grid-images',
        )}
      >
        <div className={cn(baseClasses.gridRow, baseClasses.gridRowMobile)}>
          <ImgItem className="img">
            <img
              src="/img1.webp"
              alt="img1"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img">
            <img
              src="/img2.webp"
              alt="img2"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img">
            <img
              src="/img3.webp"
              alt="img3"
              className="w-full h-full object-cover"
            />
          </ImgItem>
        </div>

        <div className={cn(baseClasses.gridRow, baseClasses.gridRowMobile)}>
          <ImgItem className="img">
            <img
              src="/img4.webp"
              alt="img4"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img hero-img">
            <img
              src="/img10.webp"
              alt="img10"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img">
            <img
              src="/img6.webp"
              alt="img6"
              className="w-full h-full object-cover"
            />
          </ImgItem>
        </div>
        <div className={cn(baseClasses.gridRow, baseClasses.gridRowMobile)}>
          <ImgItem className="img">
            <img
              src="/img7.webp"
              alt="img7"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img">
            <img
              src="/img8.webp"
              alt="img8"
              className="w-full h-full object-cover"
            />
          </ImgItem>

          <ImgItem className="img">
            <img
              src="/img9.webp"
              alt="img9"
              className="w-full h-full object-cover"
            />
          </ImgItem>
        </div>
      </div>

      <HeaderNav isIntro={true} />

      <div
        className={cn(
          baseClasses.bannerImg,
          baseClasses.hiddenOnMobile,
          'banner-img banner-img-1',
        )}
      >
        <img
          src="/img5.webp"
          alt="img5-banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={cn(
          baseClasses.bannerImg,
          baseClasses.hiddenOnMobile,
          'banner-img banner-img-2',
        )}
      >
        <img
          src="/img6.webp"
          alt="img6-banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={cn(
          baseClasses.introCopy,
          baseClasses.hiddenOnMobile,
          'intro-copy',
        )}
      >
        <NavItem className={baseClasses.navText}>Creative</NavItem>
        <NavItem className={baseClasses.navText}>Impact</NavItem>
      </div>

      <div
        className={cn(
          baseClasses.title,
          baseClasses.titleMobile,
          'title [@media(max-width:900px)]:bottom-[1rem]',
        )}
      >
        <NavItem
          className={cn(baseClasses.navText, baseClasses.word, 'normal-case')}
        >
          HCM City
        </NavItem>
      </div>
    </div>
  )
}

export default LandingPage
