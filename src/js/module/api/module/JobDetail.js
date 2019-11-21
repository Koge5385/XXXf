import AxiosBase from '../AxiosBase'
import MetaReplace from './MetaReplace'

// 定数
const SUCCESS_TARGET_CLASS = '.js-success-target'
const ERROR_TARGET_CLASS = '.js-error-target'
const BACK_LINK_TARGET_CLASS = '.js-jobListBackLink-target'

/**
 * @class JobDetail
 * @desc 求人詳細データの呼び出し⇒反映処理
 */
class JobDetail {
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
    this.jobId = params.get('id')
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
      document.querySelector(SUCCESS_TARGET_CLASS).style.display = 'block'
      document.querySelector(ERROR_TARGET_CLASS).style.display = 'none'

      const jobData = response.data.job

      // 指定した名前の要素取得する
      const targetElement = elementName => document.querySelector(`.js-async-${elementName}-target`)

      // 指定した名前の要素に対してinnerHTMLでデータを反映する
      const setElement = (name, value) => targetElement(name).innerHTML = value.replace(/\r?\n/g, '<br>')

      // APIレスポンスデータを指定の箇所に反映する
      Object.keys(jobData).forEach(key => {
        switch (key) {
          case 'job_p_position':
            setElement('category', jobData[key])
            break

          case 'job_p_phasedate':
            setElement('date', jobData[key])
            break

          case 'job_u_kyuujinnnoosusumepointo':
            setElement('title', jobData[key])

            // パンくずリストにも求人件名を反映
            setElement('breadcrumbText', jobData[key])
            break

          case 'job_p_publish':
            setElement('buildingName', jobData[key].option_p_nondisclosure.option_p_name)
            break

          case 'job_p_job_category':
            setElement('occupation', jobData[key].option_u_010895.option_p_name)
            break

          case 'job_p_area':
            setElement('place', jobData[key])
            break

          case 'job_p_min_salary':
            setElement('minSalary', Number(String(jobData[key]).slice(0, -4)).toLocaleString())
            break

          case 'job_p_max_salary':
            setElement('maxSalary', Number(String(jobData[key]).slice(0, -4)).toLocaleString())
            break

          case 'job_p_job_category_summary':
            setElement('sumally', jobData[key])
            break

          case 'job_u_boshuushikaku':
            setElement('conditions', jobData[key])
            break

          case 'job_p_employment_type':
            setElement('position', jobData[key].option_p_fullTime.option_p_name)
            break

          case 'job_p_woking_hours':
            setElement('workTime', jobData[key])
            break

          case 'job_p_holidays':
            setElement('holiday', jobData[key])
            break

          case 'job_u_shiyoukikannoumu':
            setElement('overtime', jobData[key])
            break

          case 'job_u_siyoukikanshousai':
            setElement('trial', jobData[key])
            break

          case 'job_p_benefits':
            setElement('benefit', jobData[key])
            break

          case 'job_u_sonotabikou':
            setElement('other', jobData[key])
            break

          default:
            break
        }
      })

      // 求人一覧に戻るボタンのリンク設定
      const params = new URLSearchParams(window.location.search)
      const paramCheck = name => params.get(name) === null ? '' : params.get(name)
      const searchOccupation = paramCheck('job_p_job_category')
      const searchArea = paramCheck('job_p_area')
      const searchSalary = paramCheck('job_p_min_salary')
      const searchKeyword = paramCheck('keywords')
      const searchStart = paramCheck('start')

      const paramCategory = `job_p_job_category=${encodeURI(searchOccupation)}`
      const paramArea = `job_p_area=${encodeURI(searchArea)}`
      const paramSalary = `job_p_min_salary=${searchSalary}`
      const paramKeyword = `keywords=${encodeURI(searchKeyword)}`

      document.querySelector(BACK_LINK_TARGET_CLASS).setAttribute('href', `./?${paramCategory}&${paramArea}&${paramSalary}&${paramKeyword}&start=${searchStart}`)

      // meta情報の変更
      const pageTitle = jobData['job_u_kyuujinnnoosusumepointo'].replace(/\r?\n/g, '')
      const pageDescription = `＜求人件名＞${pageTitle}＜仕事内容＞${jobData['job_p_job_category_summary'].replace(/\r?\n/g, '')}`
      new MetaReplace(pageTitle, pageDescription)
    }
    if (status === 400 || status === 401) {
      document.querySelector(SUCCESS_TARGET_CLASS).style.display = 'none'
      document.querySelector(ERROR_TARGET_CLASS).style.display = 'block'
    }
  }
}

export default JobDetail
