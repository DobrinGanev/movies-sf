const {postRequest} = require('./utils')
const GRAPHQL_ENDPOINT = `${process.env['GRAPHQL_ENDPOINT']}`

const graphQuery = async (query, variables) => {
  const response = await postRequest(
    {
      query: query,
      variables: JSON.parse(variables),
    },
    GRAPHQL_ENDPOINT // this is my python server. if you change it change the .env var
  )
  return response.data
}

module.exports = {
  graphQuery,
}
