const withPath = require('./withPath')
module.exports = function getEnty(path) {
  let entry = {}
  withPath(path).map(item => {
    entry[`${item}`] = `${path}/${item}/index.js`
  })
  return entry
}
