import http from '@Service/index'
export default {
  namespace: 'home',

  state: {
    markdowm: '',
    slideList: [
      {
        name: '指南',
        children: [
          {
            title: '关于 Mulit-page-react',
            active: true,
            url: './static/markdowm/about.md'
          },
          {
            title: '解决了什么问题？',
            url: './static/markdowm/doSomeThing.md'
          },

          {
            title: '项目结构说明',
            url: './static/markdowm/desciption.md'
          },
          {
            title: '为何使用Dva？',
            url: './static/markdowm/useDva.md'
          },
          {
            title: 'webpack从零开始',
            url: './static/markdowm/webpack.md'
          }
        ]
      }
    ]
  },

  subscriptions: {},

  effects: {
    *asyncChange({ url, slideList }, { put, call }) {
      const markdowm = yield call(http.getMarkdowm, url)
      yield put({ type: 'changeMarkdowm', markdowm })
      if (slideList) {
        yield put({ type: 'changeSlideList', slideList })
      }
    }
  },

  reducers: {
    changeMarkdowm(state, { markdowm }) {
      return { ...state, markdowm }
    },
    changeSlideList(state, { slideList }) {
      return { ...state, slideList }
    }
  }
}
