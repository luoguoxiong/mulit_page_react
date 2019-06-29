const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const withPath = require('./withPath')
function createHtml(page_path) {
  return withPath(page_path).map(item => {
    let infoData = {
      title: 'multi_page_react',
      keywords: 'multi_page_react',
      description: 'multi_page_react'
    }
    try {
      // 读取各文件夹的pageinfo.json配置数据
      const infoJson = fs.readFileSync(
        `${page_path}/${item}/pageinfo.json`,
        'utf-8'
      )
      infoData = { ...JSON.parse(infoJson) }
    } catch (err) {
      infoData = {}
    }
    return new HtmlWebpackPlugin({
      version: `window._version_='${process.env.VERSION || 0}'`,
      project: `window._projectName_='${process.env.PROJECT || 0}'`,
      title: infoData.title,
      meta: {
        keywords: infoData.keywords,
        description: infoData.description
      },
      // 根据你配的chunks,生成js link入口
      chunks: [`${item}`, 'styles', 'common', 'vendor', 'markdown'],
      template: './webpack/template.html',
      // 因为webpack目前不支持把按需加载打包到指定的目录下，暂时这么配置
      filename: item == 'index' ? 'index.html' : `./${item}/index.html`,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    })
  })
}

module.exports = createHtml
