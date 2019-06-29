export default {
  namespace: 'todo',

  state: {
    todoList: []
  },

  subscriptions: {},

  effects: {},

  reducers: {
    add(state, { item }) {
      return { todoList: [...state.todoList, item] }
    },

    remove(state, { item }) {
      const index = state.todoList.indexOf(item)
      state.todoList.splice(index, 1)
      return { todoList: [...state.todoList] }
    },

    change(state, { item }) {
      const index = state.todoList.indexOf(item)
      state.todoList[index].isComplete = !item.isComplete
      return { todoList: [...state.todoList] }
    }
  }
}
