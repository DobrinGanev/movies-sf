import {gqlQuery} from './gqlQuery'

// called this manual fetch because I may have a hook that do polling,
// or fetches as soon as is rendered
const manualFetch = async (query, variables) => {
  try {
    const result = await gqlQuery(query, variables)
    return result.data
  } catch (e) {
    // do something with the error. broadcast it to some service(bugsnag, sentry..)
  }
}

export default manualFetch
