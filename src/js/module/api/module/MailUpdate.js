import AxiosBase from '../AxiosBase'

/**
 * @class MailUpdate
 * @desc メールアドレス更新時の処理
 */
class MailUpdate {
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
    const params = new URLSearchParams(window.location.search)
    const updateToken = params.get('token')

    if (updateToken !== null) {
      const tokenData = { 'token': updateToken }
      const sendObject = JSON.stringify(tokenData)
      await new AxiosBase().postMethod('/user/verifies/update_email', sendObject, this.setDataToPage)
    }
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      console.log(response)
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default MailUpdate
