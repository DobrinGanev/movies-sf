const spawn = require('child_process').spawn
// spawn a process and start the Flask server
const run = () => {
  const process = spawn('python3', ['../python/server.py'])
  process.stdout.on('data', function(data) {
    console.log(data.toString())
  })
}
run()
