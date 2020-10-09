const fetch = require('node-fetch')

class App {
	constructor({ emitter, octoprint }) {
		this.emitter = emitter
		this.octoprint = octoprint
		this.init()
	}

	init() {
		this.connect()
		this.emitter.once('connected', () => {})
	}

	connect() {
		this.getJob()
			.then(() => this.emitter.emit('connected'))
			.catch((err) => {
				console.log(err.message)
				console.log(`can't connect to octoprint, retrying`)
				setTimeout(this.getJob, 1000)
			})
	}

	getJob() {
		return this.api('job').then((body) => console.log(body))
	}

	api(type) {
		const { host, key } = this.octoprint
		return fetch(`${host}/api/${type}`, {
			headers: {
				'X-Api-Key': key,
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json())
	}
}

module.exports = App
