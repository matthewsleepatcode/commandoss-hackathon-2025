import gsap from 'gsap'

import { CustomEase } from 'gsap/all'
import SplitType from 'split-type'
import { ProjectsData } from '../mocks/data'
import { cn } from '@/lib/utils'
import { baseClasses } from '../_components/styled'

export const initGsap = () => {
  gsap.registerPlugin(CustomEase)
  CustomEase.create('hop', '0.9, 0, 0.1, 1')

  const projectsContainer = document.querySelector('.projects')
  const locationsContainer = document.querySelector('.locations')

  const gridImgs = gsap.utils.toArray('.img')
  const heroImg = document.querySelector('.img.hero-img')

  const images = gridImgs.filter((img) => img !== heroImg)

  const introCopy = new SplitType('.intro-copy h1', {
    types: 'words',
    absolute: false,
  })

  const titleHeading = new SplitType('.title h1', {
    types: 'words',
    absolute: false,
  })

  const allImgsSources = Array.from(
    {
      length: 10,
    },
    (_, i) => `/img${i + 1}.webp`,
  )

  const getRandomImg = () => {
    const shuffled = [...allImgsSources].sort(() => 0.5 - Math.random())

    return shuffled.slice(0.9)
  }

  const startImgRotate = () => {
    const totalCycles = 20

    for (let cycle = 0; cycle < totalCycles; cycle++) {
      const randomImgs = getRandomImg()

      gsap.to(
        {},
        {
          duration: 0,
          delay: cycle * 0.15,
          onComplete: () => {
            gridImgs.forEach((img, index) => {
              const imgElement = (img as Document)?.querySelector('img')

              if (!imgElement) return

              if (cycle === totalCycles - 1 && img === heroImg) {
                imgElement.src = '/img1.webp' // set img center here

                gsap.set('.hero-img img', { scale: 2, objectFit: 'contain' })
              } else {
                imgElement.src = randomImgs[index].toString()
              }
            })
          },
        },
      )
    }
  }

  const setUpInit = () => {
    gsap.set('nav', {
      y: '-125%',
    })

    gsap.set(introCopy.words, {
      y: '110%',
    })

    gsap.set(titleHeading.words, {
      y: ' 110%',
    })
  }

  const overlayGsapObj = {
    backgroundPosition: '0% 0%',
    color: '#fff',
    duration: 0.75,
    ease: 'hop',
  }

  const createAnimateTimeline = () => {
    const overlayTime = gsap.timeline()
    const imagesTime = gsap.timeline()
    const textTime = gsap.timeline()

    overlayTime.to('.logo-line-1', {
      ...overlayGsapObj,
      delay: 0.25,
      onComplete: () => {
        gsap.to('.logo-line-2', {
          ...overlayGsapObj,
          delay: 0.25,
          onComplete: () => {
            gsap.to('.logo-line-3', {
              ...overlayGsapObj,
            })
          },
        })
      },
    })

    overlayTime.to(['.projects-header', '.projects-item'], {
      opacity: 1,
      duration: 0.15,
      stagger: 0.075,
      delay: 2,
    })

    overlayTime.to(
      ['.locations-header', '.locations-item'],
      {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
        delay: 1,
      },
      '<',
    )

    overlayTime.to('.projects-item', {
      color: '#fff',
      duration: 0.15,
      stagger: 0.075,
    })

    overlayTime.to(
      '.locations-item',
      {
        color: '#fff',
        duration: 0.15,
        stagger: 0.075,
      },
      '<',
    )

    overlayTime.to(['.projects-header', '.projects-item'], {
      opacity: 0,
      duration: 0.15,
      stagger: 0.075,
    })

    overlayTime.to(
      ['.locations-header', '.locations-item'],
      {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      },
      '<',
    )

    overlayTime.to('.overlay', {
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
    })

    imagesTime.to('.img', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      delay: 2.5,
      stagger: 0.05,
      ease: 'hop',
      onStart: () => {
        setTimeout(() => {
          startImgRotate()
          gsap.to('.loader', { opacity: 0, duration: 0.3 })
        }, 1000)
      },
    })

    imagesTime.to(images, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1,
      delay: 2.5,
      stagger: 0.05,
      ease: 'hop',
    })

    imagesTime.to('.hero-img', {
      y: -50,
      duration: 1,
      ease: 'hop',
    })

    imagesTime.to('.hero-img', {
      scale: 4,
      clipPath: 'polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)',
      duration: 1.5,
      ease: 'hop',
      onStart: () => {
        gsap.to('.hero-img img', {
          scale: 1,
          duration: 1.5,
          ease: 'hop',
        })

        gsap.to('.banner-img', {
          scale: 1,
          delay: 0.5,
          //   duration: 0.5,
        })

        gsap.to('.nav', { y: '0%', duration: 1, ease: 'hop', delay: 0.25 })
      },
    })

    imagesTime.to(
      '.banner-img-1',
      {
        left: '40%',
        rotate: -20,
        duration: 1.5,
        delay: 0.5,
        ease: 'hop',
      },
      '<',
    )

    imagesTime.to(
      '.banner-img-2',
      {
        left: '60%',
        rotate: 20,
        duration: 1.5,
        // delay: 0.5,
        ease: 'hop',
      },
      '<',
    )

    textTime.to(titleHeading.words, {
      y: '0%',
      duration: 1,
      stagger: 0.1,
      delay: 9.5,
      ease: 'power3.out',
    })

    textTime.to(
      introCopy.words,
      {
        y: '0%',
        duration: 1,
        stagger: 0.1,
        delay: 0.25,
        ease: 'power3.out',
      },
      '<',
    )
  }

  const initializeDynamicContent = () => {
    ProjectsData.forEach((project) => {
      const projectItem = document.createElement('div')
      projectItem.className = `${cn('projects-item', baseClasses.boxContentHeader)}` //

      const projectName = document.createElement('p')
      projectName.textContent = project.name

      const projectDescription = document.createElement('p')
      projectDescription.textContent = project.description

      projectItem.appendChild(projectName)

      projectItem.appendChild(projectDescription)
      projectsContainer?.appendChild(projectItem)
    })

    ProjectsData.forEach((project) => {
      const locationItem = document.createElement('div')
      locationItem.className = `${cn(baseClasses.boxContentHeader, 'locations-item w-1/2 flex justify-center')}` //

      const locationtName = document.createElement('p')
      locationtName.textContent = project.location

      locationItem.appendChild(locationtName)
      locationsContainer?.appendChild(locationItem)
    })
  }
  const init = () => {
    initializeDynamicContent()
    setUpInit()
    createAnimateTimeline()
  }

  init()
}
