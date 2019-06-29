import React from 'react'
import './index.scss'
class Header extends React.Component {
  render() {
    return (
      <div id="homeHeader">
        <header>
          <img src="./static/img/logo.png"></img>
          <div className="titleName">Mulit-page-react</div>
          <nav>
            <div className="item active">指南</div>
            {/* <div className="item ">issues</div>
            <div className="item">Github</div> */}
          </nav>
        </header>
      </div>
    )
  }
}
export default Header
