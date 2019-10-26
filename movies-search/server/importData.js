const {exec} = require('child_process')
// drop and import the data into database movies and collection movies
exec(
  'mongoimport --db movies --collection movies --type json  --drop  --file data.json --jsonArray',
  (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)

    // index the collection so we can do search on terms
    exec('mongo < indexCollection.js', (err, stdout, stderr) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
  }
)
