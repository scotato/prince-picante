class Prince {
	constructor({ emitter }) {
		this.emitter = emitter
		this.job = {}
		this.printer = {}
		this.unicorn = {}
		this.pollFrequency = 1000
		this.completion = 0
		this.init()
	}

	init() {
		this.emitter.on('job', (job) => (this.job = job))
		this.emitter.on('printer', (printer) => (this.printer = printer))
		this.emitter.on('unicorn', (unicorn) => (this.unicorn = unicorn))
		this.emitter.once('connected', () => this.poll())
	}

	poll() {
		setInterval(() => {
			const { printing } = this.printer
			const { status } = this.unicorn
			const { progress } = this.job

			if (progress) {
				const completion = Math.floor(progress.completion)
				if (this.completion !== completion) {
					this.completion = completion
					console.log(this.completion)
				}
			}

			if (printing && status && status !== 'rainbow') {
				this.emitter.emit('rainbow')
			}

			if (!printing && status && status !== 'Busy') {
				this.emitter.emit('busy')
			}
		}, this.pollFrequency)
	}
}

module.exports = Prince
