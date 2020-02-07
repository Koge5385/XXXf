import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const FORM_TARGET_CLASS = '.js-async-jobContactForm-target'
const SUBMIT_TARGET_CLASS = '.js-async-jobContactSubmit-target'

/**
 * @class JobContact
 * @desc 求人問い合わせ送信の処理
 */
class JobContact {
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
    const params = new URLSearchParams(window.location.search)
    const jobId = params.get('jobId')
    const optionObject = { 'job_id': jobId }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    await new AxiosBase().postMethod('/contacts/job_send', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      console.log(response)
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      const params = new URLSearchParams(window.location.search)
      const jobId = params.get('jobId')
      document.location.href = `./contact_complete.html?jobId=${jobId}`
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      console.log('error')
    }
  }
}

export default JobContact
