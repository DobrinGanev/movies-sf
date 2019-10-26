// the react host is the back-end of this front end.
// and my graphql end point is served there. changing the host? change this env param.
const ROOT_URL = process.env.REACT_APP_HOST

export const gqlQuery = async (query, variables) => {
  const url = `graphql?query=${query}&&variables=${JSON.stringify(variables)}`
  const res = await fetch(`${ROOT_URL}/${url}`) // simple, no libs just the browser fetch
  return await res.json()
}
