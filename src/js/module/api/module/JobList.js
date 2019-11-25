import AxiosBase from '../AxiosBase'
import AutoTextOmit from '../../AutoTextOmit'
import JobListPagenation from './JobListPagenation'

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
   * @desc APIリクエストに必要なパラメーターを取得して返却する
   */
  getParameter() {
    const params = new URLSearchParams(window.location.search)

    // パラメーターがnullの場合は空に変換する処理
    const paramCheck = name => params.get(name) === null ? '' : params.get(name)

    // APIリクエストに必要なパラメーターの取得
    this.jobOccupation = paramCheck('job_p_job_category')
    this.jobArea = paramCheck('job_u_kinmutitodoufuken')
    this.jobSalary = paramCheck('job_p_min_salary')
    this.jobSearch = paramCheck('keywords')
    this.jobStart = paramCheck('start')

    // 検索された値の引き継ぎ処理を実行
    JobList.inputValueTransfer('formOccupation', this.jobOccupation)
    JobList.inputValueTransfer('formArea', this.jobArea)
    JobList.inputValueTransfer('formSalary', this.jobSalary)
    JobList.inputValueTransfer('formKeywords', this.jobSearch)

    // パラメーターのURIエンコード
    this.category = `job_p_job_category=${encodeURI(this.jobOccupation)}`
    this.area = `job_u_kinmutitodoufuken=${encodeURI(this.jobArea)}`
    this.salary = `job_p_min_salary=${this.jobSalary}`
    this.keyword = `keywords=${encodeURI(this.jobSearch)}`

    return `/jobs/list?${this.category}&${this.area}&${this.salary}&${this.keyword}&start=${this.jobStart}&count=10&time=${new Date().getTime()}`
  }

  /**
   * @desc API実行
   */
  async doAxios() {
    await new AxiosBase().getMethod(this.getParameter(), this.setDataToPage.bind(this))
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      const jobListArray = response.data.jobs

      // 検索結果件数の反映
      JobList.setSearchResult(response.attributes.total)

      // ページネーションの生成
      new JobListPagenation(response.attributes.total, response.attributes.start)

      // 求人一覧の生成
      const targetOrigin = document.querySelector('.js-async-origin-target')
      const listItemTemplate = targetOrigin.firstElementChild
      listItemTemplate.parentNode.removeChild(listItemTemplate)
      Object.keys(jobListArray).forEach(item => {
        const jobListData = jobListArray[item]
        const _listItemTemplate = listItemTemplate.cloneNode(true)

        // 指定した名前の要素取得する処理
        const targetElement = elementName => _listItemTemplate.querySelector(`.js-async-${elementName}-target`)

        // 指定した名前の要素に対してinnerHTMLでデータを反映する処理
        const setElement = (name, value) => targetElement(name).innerHTML = value.replace(/\r?\n/g, '<br>')

        // APIレスポンスデータを指定の箇所に反映する
        Object.keys(jobListData).forEach(key => {
          switch (key) {
            case 'id':
              const searchParam = `${this.category}&${this.area}&${this.salary}&${this.keyword}&start=${this.jobStart}`
              targetElement('link').setAttribute('href', `./detail.html?id=${jobListData[key]}&${searchParam}`)
              break

            case 'job_p_position':
              setElement('category', jobListData[key])
              break

            case 'job_p_phase_date':
              setElement('date', String(jobListData[key]).slice(0,10))
              break

            case 'job_u_kyuzintaitoru':
              setElement('title', jobListData[key])
              break

            case 'job_p_publish':
              for (const name in jobListData[key]) {
                setElement('buildingName', jobListData[key][name].option_p_name)
              }
              break

            case 'job_p_job_category':
              for (const name in jobListData[key]) {
                setElement('occupation', jobListData[key][name].option_p_name)
              }
              break

            case 'job_u_kinmutitodoufuken':
              setElement('place', jobListData[key])
              break

            case 'job_p_min_salary':
              setElement('minSalary', jobListData[key])
              break

            case 'job_p_max_salary':
              setElement('maxSalary', jobListData[key])
              break

            case 'job_p_job_category_summary':
              setElement('sumally', jobListData[key])
              break

            default:
              break
          }
        })
        targetOrigin.appendChild(_listItemTemplate)
      })

      // 「仕事内容」の3点リーダー処理
      new AutoTextOmit('.js-async-sumally-target', 69)
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }

  /**
   * @desc 検索された値を引き継ぐ処理
   * @param {String} targetName 対象要素名
   * @param {String} inputValue 引き継ぎしたい値
   */
  static inputValueTransfer(targetName, inputValue) {
    // PCとSPで要素が別のためquerySelectorAllで対象要素を取得して処理
    const targetNode = document.querySelectorAll(`.js-async-${targetName}-target`)
    const targetArray = Array.prototype.slice.call(targetNode, 0)

    targetArray.forEach(input => {
      if (inputValue !== null && inputValue !== '') input.value = inputValue
    })
  }

  /**
   * @desc 検索結果件数の反映処理
   * @param {Number} result APIレスポンス「response.attributes.total」のデータ
   */
  static setSearchResult(result) {
    // PCとSPで要素が別のためquerySelectorAllで対象要素を取得して処理
    const resultNode = document.querySelectorAll('.js-async-result-target')
    const resultArray = Array.prototype.slice.call(resultNode, 0)

    resultArray.forEach(target => {
      target.innerText = Number(result).toLocaleString()
    })
  }
}

export default JobList
