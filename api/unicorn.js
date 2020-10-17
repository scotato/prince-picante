const { exec } = require('child_process')

class Unicorn {
  constructor({ emitter }) {
    this.emitter = emitter
    this.types = ['busy', 'rainbow']
    this.init()
  }

  init() {
    this.types.forEach((type) => this.emitter.on(type, () => console.log(type)))
  }
}

module.exports = Unicorn
