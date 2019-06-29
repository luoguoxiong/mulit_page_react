import React from 'react'
import Editor from 'for-editor'
class Markdown extends React.Component {
  componentDidMount() {
    var style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = '.for-edit-preview{line-height: unset !important; }'
    document
      .getElementsByTagName('head')
      .item(0)
      .appendChild(style)
  }
  render() {
    return (
      <Editor
        style={{ lineHeight: 0 }}
        height="auto"
        toolbar={{
          h1: false, // h1
          h2: false, // h2
          h3: false, // h3
          h4: false, // h4
          img: false, // 图片
          link: false, // 链接
          code: false, // 代码块
          preview: false, // 预览
          expand: false, // 全屏
          undo: false, // 撤销
          redo: false, // 重做
          save: false, // 保存
          subfield: false // 单双栏模式
        }}
        value={this.props.value}
        preview
      />
    )
  }
}
export default Markdown
