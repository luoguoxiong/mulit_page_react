import React, { Component } from 'react'
import { connect } from '@Common/Decorators'
import { Header, Slide, Container } from '../component'
import { Markdown } from '@Component'

@connect(({ home }) => ({
  ...home
}))
class Home extends Component {
  componentWillMount() {
    this.props.slideList.map(item => {
      item.children.map(temp => {
        temp.active && this.getMarkdowm(temp.url)
      })
    })
  }

  getMarkdowm(url, slideList) {
    this.props.dispatch({
      type: 'home/asyncChange',
      url,
      slideList
    })
  }

  chooseItem(index, _index) {
    const { slideList } = this.props
    slideList.map(item => {
      item.children.map(temp => {
        temp.active = false
      })
    })
    slideList[index].children[_index]
    slideList[index].children[_index].active = true
    this.getMarkdowm(slideList[index].children[_index].url, slideList)
  }

  render() {
    const { markdowm, slideList } = this.props
    return (
      <div>
        <Header />
        <Slide slideList={slideList} clickItem={this.chooseItem.bind(this)} />
        <Container>
          <Markdown value={markdowm}></Markdown>
        </Container>
      </div>
    )
  }
}

export default Home
