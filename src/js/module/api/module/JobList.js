import AxiosBase from '../AxiosBase'
import AutoTextOmit from '../../AutoTextOmit'
import JobListPagenation from './JobListPagenation'
import MetaReplace from './MetaReplace'

// 定数
const ADD_SHOW_CLASS = 'is-show'

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
    this.jobSalary = paramCheck('job_p_max_salary')
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
    this.salary = `job_p_max_salary=${this.jobSalary}`
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

      // 検索結果が0件の場合の処理
      if (response.attributes.total === 0) {
        document.querySelector('.js-async-resultEmpty-target').classList.add(ADD_SHOW_CLASS)

        // Meta情報の変更
        // const pageTitle = '求人・転職情報 | MPLAT求職支援で転職！';
        // const pageDescription = '病院事務職、医療事務職の求人サイトのM.PLAT求職支援の求人情報の一覧です。医療経営士を取得したエージェントが転職支援を担当します。'
        // new MetaReplace(pageTitle, pageDescription);
        // meta情報の変更
      const occupation = document.querySelector('.js-async-formOccupation-target option[value="' + this.jobOccupation + '"]').text
      const area = document.querySelector('.js-async-formArea-target option[value="' + this.jobArea + '"]').text
      if (occupation == '職種で探す' && area == '勤務地で探す') {
        var searchCond = ''
      } else if(occupation == '職種で探す' && area !== '勤務地で探す') {
        var searchCond = area + 'の'
      } else if(occupation !== '職種で探す' && area == '勤務地で探す') {
        var searchCond = occupation + 'の'
      } else {
        var searchCond = area + '・' + occupation + 'の';
      }
      const pageTitle = searchCond + '求人・転職情報 | MPLAT求職支援で転職！';
      const pageDescription = '病院事務職、医療事務職の求人サイトのM.PLAT求職支援の求人情報の一覧です。医療経営士を取得したエージェントが転職支援を担当します。'

      new MetaReplace(pageTitle, pageDescription);

        return
      }

      // ページネーションの生成
      new JobListPagenation(response.attributes.total, response.attributes.start)

      // 求人一覧の生成
      const targetOrigin = document.querySelector('.js-async-origin-target')
      const listItemTemplate = targetOrigin.firstElementChild
      //listItemTemplate.parentNode.removeChild(listItemTemplate)
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

            case 'job_p_id':
              setElement('category', jobListData[key])
              break

            case 'job_u_newfuragu':
              for (const name in jobListData[key]) {
                if (name === 'option_u_010927') {
                  targetElement('new').classList.add(ADD_SHOW_CLASS)
                }
              }
              break

            case 'job_p_update_date':
              setElement('date', String(jobListData[key]).slice(0,10))
              break

            case 'job_u_kyuzintaitoru':
              setElement('title', jobListData[key])
              break

            case 'job_p_publish':
              for (const name in jobListData[key]) {
                setElement('buildingName', jobListData.recruiter_p_name)
              }
              break

            case 'job_p_job_category':
              for (const name in jobListData[key]) {
                setElement('occupation', jobListData[key][name].option_p_name)
              }
              break

            case 'job_u_kinmutitodoufuken':
              for (const name in jobListData[key]) {
                setElement('place', jobListData[key][name].option_p_name)
              }
              break

            case 'job_p_min_salary':
              setElement('minSalary', jobListData[key])
              break

            case 'job_p_max_salary':
              setElement('maxSalary', jobListData[key])
              break

            case 'job_p_job_category_summary':
              targetElement('sumally').innerHTML = jobListData[key].replace(/\r?\n/g, '')
              break

            default:
              break
          }
        })
        targetOrigin.appendChild(_listItemTemplate)
      })

      // 「仕事内容」の3点リーダー処理
      new AutoTextOmit('.js-async-sumally-target', 69)

      // meta情報の変更
      const occupation = document.querySelector('.js-async-formOccupation-target option[value="' + this.jobOccupation + '"]').text
      const area = document.querySelector('.js-async-formArea-target option[value="' + this.jobArea + '"]').text
      if (occupation == '職種で探す' && area == '勤務地で探す') {
        var searchCond = ''
      } else if(occupation == '職種で探す' && area !== '勤務地で探す') {
        var searchCond = area + 'の'
      } else if(occupation !== '職種で探す' && area == '勤務地で探す') {
        var searchCond = occupation + 'の'
      } else {
        var searchCond = area + '・' + occupation + 'の';
      }
      const pageTitle = searchCond + '求人・転職情報 | MPLAT求職支援で転職！';
      const pageDescription = '病院事務職、医療事務職の求人サイトのM.PLAT求職支援の求人情報の一覧です。医療経営士を取得したエージェントが転職支援を担当します。'

      new MetaReplace(pageTitle, pageDescription);

    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector('.js-async-resultEmpty-target').classList.add(ADD_SHOW_CLASS)
      return
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
