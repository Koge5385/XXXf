import AxiosBase from '../AxiosBase'

/**
 * @class LoginCheck
 * @desc ログイン状態を判定する
 */
class LoginCheck {
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
    const callToken = localStorage.getItem('access_token')
    await new AxiosBase().getMethod(`/user/sessions/${callToken}?time=${new Date().getTime()}`, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} data コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, data) {
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default LoginCheck
