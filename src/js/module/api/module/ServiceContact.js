import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const FORM_TARGET_CLASS = '.js-async-serviceContactForm-target'
const COMPLETE_HREF = './complete.html'

/**
 * @class ServiceContact
 * @desc 医療機関採用担当者の方へお問い合わせ送信の処理
 */
class ServiceContact {
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
    const sendObject = new JsonConvert(FORM_TARGET_CLASS)
    await new AxiosBase().postMethod('/contacts/recruiter_send', sendObject.convertObject(), this.setDataToPage)
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

export default ServiceContact
