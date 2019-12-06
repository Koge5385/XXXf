import 'regenerator-runtime'
import 'es6-promise/auto'
import 'url-search-params-polyfill'
import 'formdata-polyfill'
import 'array-from-polyfill'
import 'es6-object-assign/auto'
import axios from 'axios'

// 定数
const ACCESS_TOKEN = 'access_token'

/**
 * @class AxiosBase
 * @desc API連携のベースファイル
 */
class AxiosBase {
  /**
   * @constructor
   */
  constructor() {
    this.setBase()
  }

  /**
   * @desc プロパティを定義する
   */
  setBase() {
    const callToken = localStorage.getItem(ACCESS_TOKEN)
    this.axios = axios.create({
      baseURL: 'https://api.mplat.jp/v1',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': callToken,
      },
      responseType: 'json',
    })
  }

  /**
   * @desc GETメソッドのaxios関数を返す
   * @param {String} path 対象のURLパラメーター
   * @param {String} callback コールバック関数
   */
  getMethod(path, callback) {
    return this.axios
      .get(path)
      .then(response => callback(response.status, response.data))
      .catch(error => callback(error.response))
  }

  /**
   * @desc POSTメソッドのaxios関数を返す
   * @param {String} path 対象のURLパラメーター
   * @param {Object} sendData 送信するデータ
   * @param {String} callback コールバック関数
   */
  postMethod(path, sendData, callback) {
    return this.axios
      .post(path, sendData)
      .then(response => callback(response.status, response.data))
      .catch(error => callback(error.response))
  }
}

export default AxiosBase
