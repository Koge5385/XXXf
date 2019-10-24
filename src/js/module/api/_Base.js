import api from 'axios'
const axios = api.create({
  baseURL: 'http://54.168.137.34:3001/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

/**
 * @class AxiosBase
 * @desc API連携のベースファイル
 */
class AxiosBase {
  /**
   * @constructor
   * @param {String} method get または post
   * @param {String} url 対象のURLパラメーター
   * @param {String} options 呼び出し時のオプション設定
   */
  constructor(method, url, options) {
    this.method = method
    this.url = url
    this.options = options
  }

  /**
   * @desc APIのベース関数
   */
  _setBase() {
    const addOptions = this.options
    const params = { timeout: 5000, addOptions }
    if (this.method === 'get') {
      axios.get(this.url, params)
        .then(response => {
          console.log(response.data)
          response.data
        })
        .catch(error => error)
      console.log('get test')
    } else if (this.method === 'post') {
      axios.post(this.url, params)
        .then(response => response.data)
        .catch(error => error)
      console.log('post test')
    }
  }
}

export default AxiosBase
