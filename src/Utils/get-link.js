
/**
 * map for link names against utility objects
 */
const loadedLinks = new Map()

/**
 * Get a style or other linked resource from a remote location.
 * @param url {string} - The URL/location of the resource to be retrieved.
 * @param name {string} - The name of the resource to be retrieved.
 */
export function getLink(url, name) {
  if (
    !loadedLinks.has(name) &&
    !document.querySelector(`link[href="${url}"]`)
  ) {
    const link = document.createElement('link')
    const body = document.getElementsByTagName('body')[0]

    link.href = url
    link.rel = 'stylesheet'
    link.type = 'text/css'

    body.appendChild(link)

    const linkObject = {
      hasLoaded: false,
      link,
      wasRejected: false,
    }

    loadedLinks.set(name, linkObject)
  }

  return loadedLinks.get(name)
}

// make the "getLink" method the default export
export default getLink
