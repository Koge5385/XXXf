import AxiosBase from '../AxiosBase'

// 定数
const ACCESS_TOKEN = 'access_token'
const LOGIN_HREF = '../login/'

/**
 * @class LoginCheck
 * @desc 非ログインの場合はログイン画面に戻す
 */
class LoginCheck {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc APIリクエストに必要なパラメーターを取得して返却する
   */
  getParameter() {
    const callToken = localStorage.getItem(ACCESS_TOKEN)
    return `/user/sessions/${callToken}?time=${new Date().getTime()}`
  }

  /**
   * @desc API実行
   */
  async doAxios() {
    await new AxiosBase().getMethod(this.getParameter(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      console.log('login!')
    }
    if (status === 400 || status === 401) {
      document.location.href = LOGIN_HREF
    }
  }
}

export default LoginCheck
