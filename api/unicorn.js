const fetch = require('node-fetch')

class Unicorn {
	constructor({ emitter, unicorn }) {
		this.emitter = emitter
		this.host = unicorn.host
		this.port = unicorn.port
		this.pollFrequency = 1000
		this.types = [
			'on',
			'off',
			'switch',
			'available',
			'busy',
			'away',
			'reset',
			'rainbow',
		]
		this.init()
	}

	init() {
		this.emitter.once('connected', () => this.poll())
		this.types.forEach((type) =>
			this.emitter.on(type, () => this.api(type, 'post'))
		)
	}

	poll() {
		setInterval(() => {
			this.api('status').then((body) => this.emitter.emit('unicorn', body))
		}, this.pollFrequency)
	}

	api(type, method = 'get') {
		const headers = { 'Content-Type': 'application/json' }
		const opts =
			type === 'rainbow' ? { method, headers, body: '{}' } : { method, headers }

		return fetch(`${this.host}:${this.port}/api/${type}`, opts).then((res) =>
			res.json()
		)
	}
}

module.exports = Unicorn
