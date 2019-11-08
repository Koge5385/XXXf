import AxiosBase from '../AxiosBase'
import AutoTextOmit from '../../AutoTextOmit'

/**
 * @class JobList
 * @desc 求人一覧データの呼び出し⇒反映処理
 */
class JobList {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc パラメーターのIDを取得してAPI実行
   */
  async doAxios() {
    const params = new URLSearchParams(window.location.search)
    const paramCheck = name => params.get(name) === null ? '' : params.get(name)
    this.jobOccupation = paramCheck('job_p_job_category')
    this.jobArea = paramCheck('job_p_area')
    this.jobSalary = paramCheck('job_p_min_salary')
    this.jobSearch = paramCheck('keywords')
    this.jobStart = paramCheck('start')
    await new AxiosBase().getMethod(`/jobs/list?job_p_job_category=${encodeURI(this.jobOccupation)}&job_p_area=${encodeURI(this.jobArea)}&job_p_min_salary=${this.jobSalary}&keywords=${encodeURI(this.jobSearch)}&start=${this.jobStart}&count=10&time=${new Date().getTime()}`, this.setDataToPage)

    // 検索した値の引き継ぎ
    const inputValueTransfer = (target, inputValue) => {
      document.querySelectorAll(target).forEach(input => {
        if (inputValue !== null) input.value = inputValue
      })
    }
    inputValueTransfer('.js-async-formOccupation-target', this.jobOccupation)
    inputValueTransfer('.js-async-formArea-target', this.jobArea)
    inputValueTransfer('.js-async-formSalary-target', this.jobSalary)
    inputValueTransfer('.js-async-formKeywords-target', this.jobSearch)

    // ページネーションクリック時、パラメーターを維持する
    document.querySelectorAll('.js-async-pagenationItem-target').forEach(elem => {
      elem.addEventListener('click', () => {
        params.set('start', elem.value)
        document.location.search = params
      })
    })
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} data コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, data) {
    if (status === 200) {
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default JobList
