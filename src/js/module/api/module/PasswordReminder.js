import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const COMPLETE_HREF = './password_reminder_complete.html'
const FORM_TARGET_CLASS = '.js-async-reminderForm-target'
const REJECT_TARGET_CLASS = '.js-async-passwordReminderReject-target'
const ADD_SHOW_CLASS = 'is-show'
const LOGIN_URL = 'https://job.mplat.jp/mypage/password_change.html'

/**
 * @class PasswordReminder
 * @desc レジュメの更新処理
 */
class PasswordReminder {
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
    const optionObject = { 'url': LOGIN_URL }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    await new AxiosBase().postMethod('/user/verifies/forgot_password', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.location.href = COMPLETE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(REJECT_TARGET_CLASS).classList.add(ADD_SHOW_CLASS)
    }
  }
}

export default PasswordReminder
