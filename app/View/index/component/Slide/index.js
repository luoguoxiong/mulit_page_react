import React from 'react'
import './index.scss'
class Slide extends React.Component {
  clickItem(index, _index) {
    this.props.clickItem(index, _index)
  }

  render() {
    const { slideList } = this.props
    return (
      <div id="HomePageSlide">
        {slideList.map((item, index) => {
          const isActive = item.children.find(temp => {
            return temp.active
          })
          return (
            <div className="slideItem" key={index}>
              <p className={`slideItemName ${isActive ? 'active' : ''}`}>
                {item.name}
              </p>
              <div className="slideInner">
                {item.children.map((temp, _index) => {
                  return (
                    <div
                      onClick={this.clickItem.bind(this, index, _index)}
                      className={`slideInnerItem ${
                        temp.active ? 'active' : ''
                      }`}
                      key={_index}
                    >
                      {temp.title}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default Slide
