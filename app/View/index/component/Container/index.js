import React from 'react'
import './index.scss'
class Container extends React.Component {
  render() {
    return <div id="homePageContainer">{this.props.children}</div>
  }
}

export default Container
