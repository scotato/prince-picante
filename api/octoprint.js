const fetch = require('node-fetch')

class Octoprint {
	constructor({ emitter, octoprint }) {
		this.emitter = emitter
		this.host = octoprint.host
		this.key = octoprint.key
		this.pollFrequency = 1000
		this.init()
	}

	init() {
		this.connect()
		this.emitter.once('connected', () => this.poll())
	}

	connect() {
		this.api('version')
			.then(() => this.emitter.emit('connected'))
			.catch((err) => {
				console.log(err.message)
				console.log(`can't connect to octoprint, retrying`)
				setTimeout(this.getJob, 1000)
			})
	}

	poll() {
		setInterval(() => {
			this.api('job').then((body) => this.emitter.emit('job', body))
			this.api('printer').then((body) =>
				this.emitter.emit('printer', body.state.flags)
			)
		}, this.pollFrequency)
	}

	api(type) {
		return fetch(`${this.host}/api/${type}`, {
			headers: {
				'X-Api-Key': this.key,
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json())
	}
}

module.exports = Octoprint
