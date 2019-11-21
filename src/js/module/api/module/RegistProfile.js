import AxiosBase from '../AxiosBase'

/**
 * @class RegistProfile
 * @desc ログイン状態を判定する
 */
class RegistProfile {
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
      console.log('error')
    }
  }
}

export default RegistProfile
