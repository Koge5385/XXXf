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
      const jobListArray = data.data.jobs
      const pageName = 'jobList'

      // 検索結果件数の反映
      document.querySelectorAll('.js-async-jobListResult-target').forEach(target => {
        target.innerText = Number(data.attributes.total).toLocaleString()
      })

      // ページネーションの生成
      const pagenationTarget = document.querySelector('.js-async-jobListPagenation-target')
      const maxPageNumber = Math.ceil(data.attributes.total / 10)
      const activeNumber = Math.ceil(data.attributes.start / 10)
      const pageNumberArray = Array.from(new Array(maxPageNumber)).map((v, i) => i)
      pageNumberArray.forEach(elem => {
        // ページネーションの要素生成
        const pagenationElement = `<button type="button" class="jobListPagenation__link js-async-pagenationItem-target" name="start" value="${elem * 10}">${elem + 1}</button>`
        const pagenationItem = document.createElement('li')
        pagenationItem.className = 'jobListPagenation__item'
        pagenationItem.innerHTML = pagenationElement

        // ページネーションの省略用の要素生成
        const pagenationDotItem = document.createElement('li')
        pagenationDotItem.innerText = '…'
        pagenationDotItem.className = 'jobListPagenation__item'
        pagenationDotItem.classList.add('jobListPagenation__item--dot')

        // アクティブページの判別とSPで非表示要素にクラス追加
        if (elem === activeNumber) pagenationItem.classList.add('is-active')
        if (elem === activeNumber + 2 || elem === activeNumber + 3 || elem === activeNumber + 4 || elem === activeNumber - 2 || elem === activeNumber - 3 || elem === activeNumber - 4) pagenationItem.classList.add('pc-view')

        // 現在のページ数に応じて要素の出し分け
        if (pageNumberArray.length <= 5){
          pagenationItem.classList.remove('pc-view')
          pagenationTarget.appendChild(pagenationItem)
        }
        if (pageNumberArray.length > 5 && activeNumber <= 5) {
          if (elem === 0) {
            pagenationItem.classList.remove('pc-view')
            pagenationTarget.appendChild(pagenationItem)
          }
          if (elem === 1 && activeNumber > 2) {
            pagenationDotItem.classList.add('sp-view')
            pagenationTarget.appendChild(pagenationDotItem)
          }
          if (activeNumber <= 2 && elem <= 3) {
            pagenationItem.classList.remove('pc-view')
          }
          if (elem <= activeNumber + 4 && elem >= activeNumber - 4) pagenationTarget.appendChild(pagenationItem)
          if (elem === maxPageNumber - 1 && activeNumber < maxPageNumber - 6) pagenationTarget.appendChild(pagenationDotItem)
          if (elem === maxPageNumber - 1) pagenationTarget.appendChild(pagenationItem)
        }
        if (pageNumberArray.length > 5 && activeNumber >= maxPageNumber - 5){
          if (elem === 0) pagenationTarget.appendChild(pagenationItem)
          if (elem === 0 && activeNumber > 5) pagenationTarget.appendChild(pagenationDotItem)
          if (elem <= activeNumber + 4 && elem >= activeNumber - 4) pagenationTarget.appendChild(pagenationItem)
          if (activeNumber >= maxPageNumber - 3 && elem >= maxPageNumber - 4) {
            pagenationItem.classList.remove('pc-view')
          }
          if (elem === maxPageNumber - 1 && activeNumber < maxPageNumber - 3) {
            pagenationDotItem.classList.add('sp-view')
            pagenationTarget.appendChild(pagenationDotItem)
          }
          if (elem === maxPageNumber - 1) {
            pagenationItem.classList.remove('pc-view')
            pagenationTarget.appendChild(pagenationItem)
          }
        }
        if (pageNumberArray.length > 5 && activeNumber > 5 && activeNumber < maxPageNumber - 5){
          if (elem === 0) {
            pagenationTarget.appendChild(pagenationItem)
            pagenationTarget.appendChild(pagenationDotItem)
          }
          if (elem <= activeNumber + 4 && elem >= activeNumber - 4) pagenationTarget.appendChild(pagenationItem)
          if (elem === maxPageNumber - 1) {
            pagenationTarget.appendChild(pagenationDotItem)
            pagenationTarget.appendChild(pagenationItem)
          }
        }
      })

      // 求人一覧の生成
      const targetOrigin = document.querySelector('.js-async-origin-target')
      const listItemTemplate = targetOrigin.firstElementChild
      listItemTemplate.parentNode.removeChild(listItemTemplate)
      Object.keys(jobListArray).forEach(item => {
        const jobListData = jobListArray[item]
        const _listItemTemplate = listItemTemplate.cloneNode(true)
        const targetElement = name => _listItemTemplate.querySelector(`.js-async-${pageName}${name}-target`)
        const setElement = (name, value) => targetElement(name).innerHTML = value.replace(/\r?\n/g, '<br>')

        Object.keys(jobListData).forEach(key => {
          switch (key) {
            case 'id':
              targetElement('Link').setAttribute('href', `./detail.html?id=${jobListData[key]}`)
              break

            case 'job_p_position':
              setElement('Category', jobListData[key])
              break

            case 'job_p_phasedate':
              setElement('Date', jobListData[key])
              break

            case 'job_u_kyuujinnnoosusumepointo':
              setElement('Title', jobListData[key])
              break

            case 'job_p_publish':
              setElement('BuildingName', jobListData[key].option_p_nondisclosure.option_p_name)
              break

            case 'job_p_job_category':
              setElement('Occupation', jobListData[key].option_u_010895.option_p_name)
              break

            case 'job_p_area':
              setElement('Place', jobListData[key])
              break

            case 'job_p_min_salary':
              setElement('MinSalary', Number(String(jobListData[key]).slice(0, -4)).toLocaleString())
              break

            case 'job_p_max_salary':
              setElement('MaxSalary', Number(String(jobListData[key]).slice(0, -4)).toLocaleString())
              break

            case 'job_p_job_category_summary':
              setElement('Sumally', jobListData[key])
              break

            default:
              break
          }
        })
        targetOrigin.appendChild(_listItemTemplate)
      })
      new AutoTextOmit('.js-async-jobListSumally-target', 69)
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default JobList
