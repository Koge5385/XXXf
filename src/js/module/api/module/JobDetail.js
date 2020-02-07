import AxiosBase from '../AxiosBase'
import MetaReplace from './MetaReplace'

// 定数
const SUCCESS_TARGET_CLASS = '.js-success-target'
const ERROR_TARGET_CLASS = '.js-error-target'
const BACK_LINK_TARGET_CLASS = '.js-jobListBackLink-target'
const ADD_SHOW_CLASS = 'is-show'

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
      document.querySelector('.jobDetailBox').classList.add('fadeInBox')
      document.querySelector(ERROR_TARGET_CLASS).style.display = 'none'

      const jobData = response.data.job

      // 指定した名前の要素取得する
      const targetElement = elementName => document.querySelector(`.js-async-${elementName}-target`)

      // 指定した名前の要素に対してinnerHTMLでデータを反映する
      const setElement = (name, value) => targetElement(name).innerHTML = value.replace(/\r?\n/g, '<br>')

      // APIレスポンスデータを指定の箇所に反映する
      Object.keys(jobData).forEach(key => {
        switch (key) {
          case 'job_p_id':
            setElement('category', jobData[key])
            break

          case 'job_u_newfuragu':
            for (const name in jobData[key]) {
              if (name === 'option_u_010927') {
                targetElement('new').classList.add(ADD_SHOW_CLASS)
              }
            }
            break

          case 'job_p_update_date':
            setElement('date', String(jobData[key]).slice(0,10))
            break

          case 'job_u_kyuzintaitoru':
            setElement('title', jobData[key])

            // パンくずリストにも求人件名を反映
            setElement('breadcrumbText', jobData[key])
            break

          case 'job_p_publish':
            for (const name in jobData[key]) {
              setElement('buildingName', jobData.recruiter_p_name)
            }
            break

          case 'job_p_job_category':
            for (const name in jobData[key]) {
              setElement('occupation', jobData[key][name].option_p_name)
            }
            break

          case 'job_u_kinmutitodoufuken':
            for (const name in jobData[key]) {
              setElement('place', jobData[key][name].option_p_name)
            }
            break

          case 'job_p_min_salary':
            setElement('minSalary', jobData[key])
            break

          case 'job_p_max_salary':
            setElement('maxSalary', jobData[key])
            break

          case 'job_p_job_category_summary':
            setElement('sumally', jobData[key])
            break

          case 'job_u_oubozyouken':
            setElement('conditions', jobData[key])
            break

          case 'job_p_employment_type':
            for (const name in jobData[key]) {
              setElement('position', jobData[key][name].option_p_name)
            }
            break

          case 'job_p_woking_hours':
            setElement('workTime', jobData[key])
            break

          case 'job_p_holidays':
            setElement('holiday', jobData[key])
            break

          case 'job_u_shiyoukikan':
            setElement('trial', jobData[key])
            break

          case 'job_p_benefits':
            setElement('benefit', jobData[key])
            break

          case 'job_u_bikou':
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
      const searchArea = paramCheck('job_u_kinmutitodoufuken')
      const searchSalary = paramCheck('job_p_min_salary')
      const searchKeyword = paramCheck('keywords')
      const searchStart = paramCheck('start')

      const paramCategory = `job_p_job_category=${encodeURI(searchOccupation)}`
      const paramArea = `job_u_kinmutitodoufuken=${encodeURI(searchArea)}`
      const paramSalary = `job_p_min_salary=${searchSalary}`
      const paramKeyword = `keywords=${encodeURI(searchKeyword)}`

      document.querySelector(BACK_LINK_TARGET_CLASS).setAttribute('href', `./?${paramCategory}&${paramArea}&${paramSalary}&${paramKeyword}&start=${searchStart}`)

      // meta情報の変更
      const offerTitle = jobData['job_u_kyuzintaitoru'].replace(/\r?\n/g, '')
      const occupation = document.querySelector(`.js-async-occupation-target`).innerHTML
      const area = document.querySelector(`.js-async-place-target`).innerHTML
      const pageTitle = offerTitle + '｜' + occupation + '｜' + area
      // const pageDescription = `＜求人件名＞${pageTitle}＜仕事内容＞${jobData['job_p_job_category_summary'].replace(/\r?\n/g, '')}`
      const pageDescription = `${offerTitle}／医療経営士を取得したエージェントが転職支援を担当。専任担当者として、情報収集、職務経歴書の書き方から面接対策まで、求職活動を支援します。`
      new MetaReplace(pageTitle, pageDescription)
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUCCESS_TARGET_CLASS).style.display = 'none'
      document.querySelector(ERROR_TARGET_CLASS).style.display = 'block'
    }
  }
}

export default JobDetail
