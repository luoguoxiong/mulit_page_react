import HttpUtils from '../http.js'
class http {
  static getMarkdowm = (url, parmas) => HttpUtils.get(url, parmas)
}
export default http
