
const NODE_ENV = process.env.NODE_ENV.replace(/"/g, '')

let settings = {}

try {
  settings = require('./' + NODE_ENV).default
} catch (e) {
  settings = {}
  console.error('Config matching', NODE_ENV, 'not found')
}

settings.NODE_ENV = NODE_ENV

export default settings
