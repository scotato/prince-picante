require('dotenv-defaults').config()
const events = require('events').EventEmitter
const App = require('./app')

const octoprint = {
	host: process.env.OCTOPRINT_HOST,
	key: process.env.OCTOPRINT_KEY,
}

const unicorn = {
	host: process.env.UNICORN_HOST,
	port: process.env.UNICORN_PORT,
}

const emitter = new events.EventEmitter()
const Prince = new App({ emitter, octoprint, unicorn })

Prince.listen(
	() => console.log(`listening for ${octoprint.host}`),
	() => console.log(`connected to ${octoprint.host}`)
)
