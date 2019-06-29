import dva from 'dva'
import model from '@Modle'
import createHistory from 'history/createHashHistory'
/**
 * @param {*} function
 * @param {*} cache 是否缓存数据
 */
const run = (ReactDom, cache = true) => {
  let initialState = undefined

  if (cache) {
    const { _version_, _projectName_ } = window

    const version = localStorage.getItem(_projectName_ + '_version') || ''

    if (version !== _version_ || version === '') {
      localStorage.setItem(_projectName_ + '_version', _version_)
      localStorage.removeItem(_projectName_ + '_initialState')
    } else {
      initialState = JSON.parse(
        localStorage.getItem(_projectName_ + '_initialState')
      )
    }
  }

  const app = dva({
    initialState: initialState || undefined,
    history: createHistory()
  })

  model.forEach(key => {
    app.model(key.default)
  })

  // app.use({});

  app.router(ReactDom)

  if (cache) {
    window.onbeforeunload = function() {
      localStorage.setItem(
        _projectName_ + '_initialState',
        JSON.stringify(app._store.getState())
      )
    }
  }

  app.start('#root')
}
export default run
