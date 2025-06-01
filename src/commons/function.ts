export const isVideo = (link: string) => {
  if (!link) return false

  const videoTypes = ['mp4', 'webm']
  let extension = ''

  try {
    const url = new URL(link)
    extension = url.pathname.split('.').pop() || ''
  } catch (error) {
    extension = link.split('.').pop() || ''
  }

  return videoTypes.includes(extension)
}

export const formatURILink = (link: string) => {
  try {
    if (!link) return ''

    const URL_IPFS = process.env.NEXT_PUBLIC_IPFS_GATEWAY

    if (link.includes('ipfs://')) {
      const ipfsUrl = new URL(
        `${URL_IPFS}/${link.replace('ipfs://', 'ipfs/')}?width=500&height=500`,
      )
      return ipfsUrl.href
    }

    if (!link.startsWith('http')) {
      return link
    }

    return new URL(link).href
  } catch (error) {
    return ''
  }
}

export const isServer = typeof window === 'undefined'
