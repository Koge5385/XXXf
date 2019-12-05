import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const MYPAGE_HREF = '../mypage/'
const FORM_TARGET_CLASS = '.js-async-editResumeForm-target'
const RESUME_UPDATE_MESSAGE = 'レジュメを更新します。よろしいですか？'
const SUBMIT_TARGET_CLASS = '.js-async-editResumeSubmit-target'

/**
 * @class EditResume
 * @desc レジュメの更新処理
 */
class EditResume {
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
    const optionObject = { 'token': token }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    const confirm = window.confirm(RESUME_UPDATE_MESSAGE)
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })
    await new AxiosBase().getMethod(`/users/${this.userId}?resume=1?time=${new Date().getTime()}`, (status, response) => {
      this.resumeId = response.data.user.resume.id
    })
    if (this.resumeId !== undefined) {
      if(confirm) {
        await new AxiosBase().postMethod(`/resumes/update/${this.resumeId}`, sendObject.convertObject(), this.setDataToPage)
      }
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
      document.location.href = MYPAGE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      console.log('error')
    }
  }
}

export default EditResume
