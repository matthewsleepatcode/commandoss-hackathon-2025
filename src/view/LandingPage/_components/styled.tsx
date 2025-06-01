export const baseClasses = {
  overlay:
    'overlay fixed top-0 left-0 w-screen h-svh p-[2em] bg-black text-white flex gap-[2em] overflow-hidden',
  boxContent: 'flex-1 flex flex-col justify-center gap-[2em]',
  hiddenOnMobile: '[@media(max-width:768px)]:hidden',
  boxContentHeader: 'flex gap-[2rem] opacity-0',

  loader: 'items-center gap-0',
  loaderMobile:
    '[@media(max-width:768px)]:absolute [@media(max-width:768px)]:top-1/2 [@media(max-width:768px)]:left-1/2 [@media(max-width:768px)]:translate-x-[-50%] [@media(max-width:768px)]:translate-y-[-50%]',
  loaderTitle:
    'text-center uppercase text-4xl italic leading-[0.9] text-transparent',

  item: 'text-[#4f4f4f] font-semibold',

  gridImage:
    'fixed left-[50%] top-2/4 translate-x-[-50%] translate-y-[-50%] w-[30%] aspect-[1] flex flex-col gap-[1em] z-[2]',
  gridImageMobile:
    '[@media(max-width:768px)]:w-[75%] [@media(max-width:768px)]:gap-[0.5rem]',

  gridRow: 'w-full flex gap-[1em]',
  gridRowMobile:
    '[@media(max-width:768px)]:w-[95%] [@media(max-width:768px)]:justify-around [@media(max-width:768px)]:gap-[0.5rem]',
  img: 'relative flex-1 aspect-[1]',

  nav: 'fixed w-screen p-[1em] flex gap-[2em]',
  links: 'flex justify-around items-center',
  navLogo: 'text-center flex justify-center',
  navItem: 'text-3xl leading-[0.9] italic',

  bannerImg:
    'absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-0 w-1/5 aspect-[4/5]',

  introCopy:
    'absolute top-[45%] translate-y-[-50%] w-full p-[0_8em] flex justify-between items-center',
  navText:
    'relative uppercase text-black font-medium italic leading-[0.9] [&>.word]:inline-block [&>.word]:relative [&>.word]:will-change-transform [&>.word]:mr-[0.1rem]',
  navTextWord: 'inline-block relative will-change-transform mr-[0.1]',

  title: 'absolute bottom-[10%] left-[50%] translate-x-[-50%]',
  titleMobile:
    '[@media(max-width:768px)]:w-full [@media(max-width:768px)]:bottom-[20%] [@media(max-width:768px)]:flex [@media(max-width:768px)]:justify-center',
  titleItem: 'text-2xl',

  word: '[@media(max-width:768px)]:[&>.word]:inline-block [@media(max-width:768px)]:[&>.word]:relative [@media(max-width:768px)]:[&>.word]:will-change-transform [@media(max-width:768px)]:[&>.word]:mr-[0.1rem]',
}
