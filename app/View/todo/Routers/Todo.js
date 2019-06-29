import React, { Component, Fragment } from 'react'
import { connect } from '@Common/Decorators'

@connect(({ todo }) => ({
  ...todo
}))
class Todo extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  addTodo = () => {
    const inputVal = this.inputRef.current.value
    if (inputVal) {
      this.props.dispatch({
        type: 'todo/add',
        item: {
          todo: inputVal,
          isComplete: false
        }
      })
      this.inputRef.current.value = ''
    }
  }

  removeTodo = item => {
    this.props.dispatch({
      type: 'todo/remove',
      item
    })
  }

  changeTodo = item => {
    this.props.dispatch({
      type: 'todo/change',
      item
    })
  }

  renderHeader = () => {
    return (
      <header>
        <input ref={this.inputRef} placeholder="Enter an activity..." />
        <button onClick={this.addTodo}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 16 16"
          >
            <g>
              <path d="M16,8c0,0.5-0.5,1-1,1H9v6c0,0.5-0.5,1-1,1s-1-0.5-1-1V9H1C0.5,9,0,8.5,0,8s0.5-1,1-1h6V1c0-0.5,0.5-1,1-1s1,0.5,1,1v6h6C15.5,7,16,7.5,16,8z"></path>
            </g>
          </svg>
        </button>
      </header>
    )
  }

  renderTodoItem = (type, list = []) => {
    return (
      <ul className="todo" id={type}>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {item.todo}
              <div className="buttons">
                <button
                  className="remove"
                  onClick={this.removeTodo.bind(this, item)}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 22 22"
                  >
                    <rect className="noFill" width="22" height="22"></rect>
                    <g>
                      <g>
                        <path
                          className="fill"
                          d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"
                        ></path>
                      </g>
                      <g>
                        <g>
                          <path
                            className="fill"
                            d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"
                          ></path>
                        </g>
                        <g>
                          <path
                            className="fill"
                            d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"
                          ></path>
                        </g>
                        <g>
                          <path
                            className="fill"
                            d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
                <button
                  onClick={this.changeTodo.bind(this, item)}
                  className="complete"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 22 22"
                    space="preserve"
                  >
                    <rect
                      y="0"
                      className="noFill"
                      width="22"
                      height="22"
                    ></rect>
                    <g>
                      <path
                        className="fill"
                        d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const { todoList } = this.props
    const todo = todoList.filter(item => !item.isComplete)
    const complete = todoList.filter(item => item.isComplete)
    return (
      <Fragment>
        {this.renderHeader()}
        <div className="container">
          {this.renderTodoItem('todo', todo)}
          {this.renderTodoItem('completed', complete)}
        </div>
      </Fragment>
    )
  }
}
export default Todo
