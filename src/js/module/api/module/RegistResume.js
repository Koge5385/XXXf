import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const FORM_TARGET_CLASS = '.js-async-registResumeForm-target'
const COMPLETE_REGIST_HREF = './regist_complete.html'
const COMPLETE_EDIT_HREF = '../mypage/'
const ACCESS_TOKEN = 'access_token'
const SUBMIT_TARGET_CLASS = '.js-async-registResumeSubmit-target'

/**
 * @class RegistResume
 * @desc レジュメの新規登録処理
 */
class RegistResume {
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
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })
    const optionObject = { 'user_id': this.userId }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    await new AxiosBase().postMethod('/resumes/create', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      if(window.location.pathname === '/signup/regist_resume.html') document.location.href = COMPLETE_REGIST_HREF
      if(window.location.pathname === '/mypage/resume_edit.html') document.location.href = COMPLETE_EDIT_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      console.log('error')
    }
  }
}

export default RegistResume
