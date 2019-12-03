import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const FORM_TARGET_CLASS = '.js-async-registProfileForm-target'
const ACCESS_TOKEN = 'access_token'
const RESUME_HREF = './regist_resume.html'

/**
 * @class RegistProfile
 * @desc ユーザープロフィールの新規登録処理
 */
class RegistProfile {
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
    const tokenData = params.get('token')
    const optionObject = { 'token': tokenData }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    await new AxiosBase().postMethod('/users/create', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
      document.location.href = RESUME_HREF
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default RegistProfile
