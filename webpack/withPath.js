const fs = require('fs')

/**
 * 【遍历某文件下的文件目录】
 */
module.exports = function withPath(path) {
  let existpath = fs.existsSync(path) //是否存在目录
  if (existpath) {
    let readdirSync = fs.readdirSync(path) //获取目录下所有文件
    // 过滤被选文件夹中有文件作为入口
    return readdirSync.filter(item => {
      let currentPath = path + '/' + item
      // 判断是否是文件夹
      let isDirector = fs.statSync(currentPath).isDirectory()
      if (isDirector) {
        try {
          // 是否有入口文件index.js
          return fs.readdirSync(currentPath).includes('index.js')
        } catch (e) {
          return false
        }
      } else {
        return false
      }
    })
  }
}
