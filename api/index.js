require('dotenv-defaults').config()
const events = require('events').EventEmitter
const process = require('process')
const App = require('./app')

const octoprint = {
	host: process.env.OCTOPRINT_HOST,
	key: process.env.OCTOPRINT_KEY,
}

const emitter = new events.EventEmitter()
const Prince = new App({ emitter, octoprint })

Prince.listen(
	() => console.log(`listening for ${octoprint.host}`),
	() => console.log(`connected to ${octoprint.host}`)
)
