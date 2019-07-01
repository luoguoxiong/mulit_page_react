# 为何使用 Dva？

> Dva 官方文档的数据流向原话
>
> 数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`，所以在 dva 中，数据流向非常清晰简明，并且思路基本跟开源社区保持一致（也是来自于开源社区）。

<img src="./static/img/model.png" width = "80%" div align=center/>

> 1. 使用 Dva 不像 saga、thunk 需要定义无数的 reducer、sagas(异步操作)、actions 文件夹，在编写 redux 这部分代码的时候需要频繁在 actions 、 constants 、 reducers 这几个目录间切换。Dva 只需要定义一个 model 即可解决。
> 2. 图上的 Localstroage 是本人自己 P 的，社区是没有的。因为在 Multi_page_react，需要做一个功能是否缓存 model 中的数据，Dva 非常容易实现这个需求。
> 3. Multi_page_react 希望用户在/app/Model 中定义数据结构，而且还是分多模块，Dva 也符合这种设计思想，既然完美兼容，使用方便，为何不使用呢？
