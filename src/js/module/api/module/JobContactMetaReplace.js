import AxiosBase from '../AxiosBase'
import MetaReplace from './MetaReplace'


// 定数
const FORM_TARGET_CLASS = '.js-async-jobContactForm-target'
const SUBMIT_TARGET_CLASS = '.js-async-jobContactSubmit-target'

/**
 * @class JobContactMetaReplace
 * @desc 求人問い合わせ表示の処理
 */
class JobContactMetaReplace {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc APIリクエストに必要なパラメーターを取得して返却する
   */
  getParameter() {
    const params = new URLSearchParams(window.location.search)
    this.jobId = params.get('jobId')
    return `/jobs/${this.jobId}?time=${new Date().getTime()}`
  }

  /**
   * @desc API実行
   */
  async doAxios() {
    await new AxiosBase().getMethod(this.getParameter(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      console.log(response)
      // meta情報の変更
      const jobData = response.data.job
      const offerTitle = jobData['job_u_kyuzintaitoru'].replace(/\r?\n/g, '')
      const pageTitle = '求人お問い合わせ -医療事務/病院事務職の求人・転職なら【エムステージ病院事務職求職支援】'
      const pageDescription = `${offerTitle}／医療経営士を取得したエージェントが転職支援を担当。専任担当者として、情報収集、職務経歴書の書き方から面接対策まで、求職活動を支援します。`
      new MetaReplace(pageTitle, pageDescription)
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default JobContactMetaReplace
