import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const FORM_TARGET_CLASS = '.js-async-registResumeForm-target'
const COMPLETE_HREF = './regist_complete.html'
const ACCESS_TOKEN = 'access_token'

/**
 * @class RegistResume
 * @desc レジュメの新規登録処理
 */
class RegistResume {
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
    const token = localStorage.getItem(ACCESS_TOKEN)
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })
    const optionObject = { 'user_id': this.userId }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    console.log(sendObject.convertObject())
    await new AxiosBase().postMethod('/resumes/create', sendObject.convertObject(), this.setDataToPage)
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
      console.log('error')
    }
  }
}

export default RegistResume
