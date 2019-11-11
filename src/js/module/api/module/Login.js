import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

/**
 * @class Login
 * @desc ログイン時の処理
 */
class Login {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc パラメーターを取得してAPI実行
   */
  async doAxios() {
    const sendObject = new JsonConvert('.js-async-loginForm-target')
    await new AxiosBase().postMethod('/user/sessions/login', sendObject.objectConvert(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} data コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, data) {
    if (status === 200) {
      localStorage.setItem('access_token', data.data.access_token)
      console.log(data)
      document.location.href = '../mypage/'
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default Login
