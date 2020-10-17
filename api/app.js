const Prince = require('./prince')
const Unicorn = require('./unicorn')
const OctoPrint = require('./octoprint')

class App {
  constructor({ emitter, octoprint }) {
    this.emitter = emitter
    this.octoprint = octoprint
  }

  init() {
    const { emitter, octoprint } = this
    this.Prince = new Prince({ emitter })
    this.Unicorn = new Unicorn({ emitter })
    this.OctoPrint = new OctoPrint({ emitter, octoprint })
  }

  listen(initMessage, connectMessage) {
    if (typeof initMessage === 'function') initMessage()

    this.emitter.once('connected', () => {
      if (typeof connectMessage === 'function') connectMessage()
    })

    this.init()
  }
}

module.exports = App
