import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const LOGIN_HREF = '../mypage/'
const FORM_CLASS_NAME = '.js-async-loginForm-target'

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
    const sendObject = new JsonConvert(FORM_CLASS_NAME)
    await new AxiosBase().postMethod('/user/sessions/login', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
      document.location.href = LOGIN_HREF
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default Login