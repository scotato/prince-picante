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
      const { progress } = this.job

      if (printing && progress) {
        const completion = Math.floor(progress.completion)
        if (this.completion !== completion) {
          this.completion = completion
          console.log(this.completion)
          this.emitter.emit('progress', this.completion)
        }
      }
    }, this.pollFrequency)
  }
}

module.exports = Prince
