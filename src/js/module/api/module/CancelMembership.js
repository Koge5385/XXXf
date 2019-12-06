import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const COMPLETE_HREF = './cancel_membership_complete.html'
const FORM_TARGET_CLASS = '.js-async-cancelForm-target'
const CANCEL_OTHER_TARGET_CLASS = '.js-async-otherInput-target'
const SUBMIT_TARGET_CLASS = '.js-async-cancelSubmit-target'

/**
 * @class CancelMembership
 * @desc 退会時の処理
 */
class CancelMembership {
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
    const token = localStorage.getItem(ACCESS_TOKEN)
    const targetForm = document.querySelector(FORM_TARGET_CLASS)
    const checkInput = targetForm.querySelector('input[type="radio"]:checked')
    const otherInputText = document.querySelector(CANCEL_OTHER_TARGET_CLASS).value
    const checkInputValue = checkInput !== null ? checkInput.value : ''
    const sendObject = otherInputText !== '' ? { 'resume_u_taikairiyu': `${checkInputValue}\r\n${otherInputText}` } : { 'resume_u_taikairiyu': checkInputValue }
    const sendData = JSON.stringify(sendObject)

    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })

    await new AxiosBase().postMethod(`/users/delete/${this.userId}`, sendData, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      localStorage.removeItem(ACCESS_TOKEN)
      document.location.href = COMPLETE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      console.log('error')
    }
  }
}

export default CancelMembership
