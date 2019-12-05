import AxiosBase from '../AxiosBase'

// 定数
const ACCESS_TOKEN = 'access_token'
const NEW_PASSWORD_TARGET_CLASS = '.js-async-newPassword-target'
const COMPLETE_HREF = './password_change_complete.html'
const SUBMIT_TARGET_CLASS = '.js-async-passwordChangeSubmit-target'

/**
 * @class PasswordChange
 * @desc パスワード変更の処理
 */
class PasswordChange {
  /**
   * @constructor
   */
  constructor() {
    document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "none"
    document.querySelector(SUBMIT_TARGET_CLASS).disabled = true
    this.doAxios()
  }

  /**
   * @desc パラメーターを取得してAPI実行
   */
  async doAxios() {
    const newPassword = document.querySelector(NEW_PASSWORD_TARGET_CLASS).value
    const params = new URLSearchParams(window.location.search)
    this.paramToken = params.get('token')

    if (this.paramToken === null) {
      const localToken = localStorage.getItem(ACCESS_TOKEN)
      await new AxiosBase().getMethod(`/user/sessions/${localToken}?time=${new Date().getTime()}`, (status, response) => {
        this.userId = response.data.user_id
      })
      // APIリクエストヘッダーに追加するJSONの作成
      const sendObject = { 'password': newPassword }
      const sendData = JSON.stringify(sendObject)

      // パスワード変更のAPIリクエスト
      await new AxiosBase().postMethod(`/users/update_password/${this.userId}`, sendData, this.setDataToPage.bind(this))
    }

    if (this.paramToken !== null) {
      // APIリクエストヘッダーに追加するJSONの作成
      const sendObject = { 'password': newPassword, 'token': this.paramToken }
      const sendData = JSON.stringify(sendObject)

      // パスワード変更のAPIリクエスト
      await new AxiosBase().postMethod('/user/verifies/update_password', sendData, this.setDataToPage.bind(this))
    }
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      this.paramToken === null ? document.location.href = COMPLETE_HREF : document.location.href = `${COMPLETE_HREF}?token=${this.paramToken}`
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      console.log('error')
    }
  }
}

export default PasswordChange
