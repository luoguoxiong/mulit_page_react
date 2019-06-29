import axios from 'axios'
const instance = axios.create({
  baseURL: '',
  withCredentials: true
})
export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) })
        })
    })
  }
  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, { ...params })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) })
        })
    })
  }
}
