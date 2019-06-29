const Koa = require('koa')
const koaStatic = require('koa-static')
const app = new Koa()
const delay = time =>
  new Promise(res => {
    setTimeout(() => res(), time)
  })
const opn = require('opn')
const port = process.env.PORT || '5555'

opn('http:127.0.0.1:' + port)

app.use(koaStatic(__dirname + '/build'))

// 模拟请求
app.use(async (ctx, next) => {
  await delay(1000)
  if (ctx.request.url === '/home') {
    ctx.body = '来自home的接口数据' + new Date().toTimeString()
  }
  if (ctx.request.url === '/goods') {
    ctx.body = '来自goods的接口数据'
  }
  next()
})

app.listen(port)
