import AxiosBase from '../AxiosBase'

// 定数
const MAIL_TARGET_CLASS = '.js-async-sendMailData-target'
const SUBMIT_TARGET_CLASS = '.js-async-entrySubmit-target'
const NEXT_STEP_URL = 'https://job.mplat.jp/signup/regist_profile.html'
const ENTRY_MAIL = 'entry_mail'
const ENTRY_HREF = './confirm_email.html'

/**
 * @class CreateAccount
 * @desc 会員登録->メールアドレス登録時の処理
 */
class CreateAccount {
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
    this.entryMail = document.querySelector(MAIL_TARGET_CLASS).value
    const entryData = { 'email': this.entryMail, 'url': NEXT_STEP_URL }
    const sendData = JSON.stringify(entryData)
    await new AxiosBase().postMethod('/user/verifies/entry', sendData, this.setDataToPage.bind(this))
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      localStorage.setItem(ENTRY_MAIL, this.entryMail)
      document.location.href = ENTRY_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      console.log('error')
    }
  }
}

export default CreateAccount
