const context = require.context('./', true, /\.js$/)
export default context
  .keys()
  .filter(item => item != './index.js')
  .map(key => {
    return context(key)
  })
