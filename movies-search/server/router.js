const {graphQuery} = require('./graphql')

module.exports = app => {
  const requireAuth = (req, res, next) => {
    // This the middleware and every request to this endpint will hit this function first
    // to continue you call next()
    // This is the place where all the auth happens. You can use passport.js to handle the core auth functions
    next()
  }

  app.get('/graphql', requireAuth, async (req, res) => {
    const {query, variables} = req.query
    try {
      const result = await graphQuery(query, variables)
      res.send(result)
    } catch (e) {
      res.status(400).send({error: 'Server Error'})
    }
  })
}
