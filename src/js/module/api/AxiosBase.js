import 'regenerator-runtime'
import 'es6-promise/auto'
import 'url-search-params-polyfill'
import 'formdata-polyfill'
import axios from 'axios'

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
    this.axios = axios.create({
      baseURL: 'http://54.168.137.34:3001/v1',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
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
      .catch(error => callback(error.message, error.type, error.code))
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
      .catch(error => callback(error.message, error.type, error.code))
  }
}

export default AxiosBase
