import React from 'react'
import './index.scss'
class Header extends React.Component {
  toUrl(url) {
    window.location.href = url
  }

  render() {
    return (
      <div id="homeHeader">
        <header>
          <img src="./static/img/logo.png"></img>
          <div className="titleName">Mulit-page-react</div>
          <nav>
            <div className="item active">指南</div>
            <div className="item" onClick={this.toUrl.bind(this, './todo')}>
              Todo
            </div>
            <div
              className="item"
              onClick={this.toUrl.bind(
                this,
                'https://github.com/Peroluo/mulit_page_react/issues'
              )}
            >
              Issues
            </div>
            <div
              className="item"
              onClick={this.toUrl.bind(
                this,
                'https://github.com/Peroluo/mulit_page_react'
              )}
            >
              Github
            </div>
          </nav>
        </header>
      </div>
    )
  }
}
export default Header
