
export function getScriptMap(secure) {
  // store the versions of the HERE API
  const apiVersion = 'v3'
  const codeVersion = '3.0'

  // get the relevant protocol for the HERE Maps API
  let protocol = ''

  if (secure === true) {
    protocol = 'https:'
  }

  // the base url for all scripts from the API
  const baseUrl =
    `${protocol}//js.api.here.com/` + `${apiVersion}/${codeVersion}`

  // core code
  const coreScript = `${baseUrl}/mapsjs-core.js`

  // service code
  const serviceScript = `${baseUrl}/mapsjs-service.js`

  // default ui code
  const uiScript = `${baseUrl}/mapsjs-ui.js`

  // map events (pan, scroll wheel zoom) code
  const mapEventsScript = `${baseUrl}/mapsjs-mapevents.js`

  // return an array with all script names within
  return {
    coreScript,
    mapEventsScript,
    serviceScript,
    uiScript,
  }
}

// make the getScriptMap method the default export
export default getScriptMap
