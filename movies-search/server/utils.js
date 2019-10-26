const axios = require('axios')

const postRequest = async (params, url) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.post(`${url}`, params, options)
  return response
}

module.exports = {
  postRequest,
}
