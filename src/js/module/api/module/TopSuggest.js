import AxiosBase from '../AxiosBase'
import AdjustHeightJobCardLine from '../../AdjustHeightJobCardLine'
import AutoTextOmit from '../../AutoTextOmit'
import Swiper from '../../../lib/vendor/swiper/swiper'

// 定数
const TEXT_ORIGIN_TARGET_CLASS = '.js-async-origin-target'
const TEXT_WORK_TARGET_CLASS = '.js-adjustHeight-work-target'
const TEXT_TITLE_TARGET_CLASS = '.js-adjustHeight-title-target'
const TEXT_TARGET_CLASS = '.js-autoTextOmit-target'
const TEXT_OMIT_SIZE = 23
const TEXT_SWIPER_TARGET_CLASS = '.swiper-container'
const TEXT_SWIPER_OPTION = {
  loop: true,
  loopAdditionalSlides: 10,
  roundLengths: true,
  freeMode: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  breakpoints: {
    768: {
      freeMode: false,
    },
  },
}

/**
 * @class TopSuggest
 * @desc 求人一覧データの呼び出し⇒反映処理
 */
class TopSuggest {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc API実行
   */
  async doAxios() {
    await new AxiosBase().getMethod(`/jobs/list?count=-1&time=${new Date().getTime()}`, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      const topJobListArray = response.data.jobs

      // おすすめ求人の生成
      const targetOrigin = document.querySelector(TEXT_ORIGIN_TARGET_CLASS)
      const cardItemTemplate = targetOrigin.firstElementChild
      cardItemTemplate.parentNode.removeChild(cardItemTemplate)
      Object.keys(topJobListArray).forEach(item => {
        const topJobData = topJobListArray[item]
        const _cardItemTemplate = cardItemTemplate.cloneNode(true)

        // 指定した名前の要素取得する処理
        const targetElement = elementName => _cardItemTemplate.querySelector(`.js-async-${elementName}-target`)

        // 指定した名前の要素に対してinnerHTMLでデータを反映する処理
        const setElement = (name, value) => targetElement(name).innerHTML = value.replace(/\r?\n/g, '<br>')

        // APIレスポンスデータを指定の箇所に反映する
        for (const name in topJobData['job_u_topgamenhyouji']) {
          if (name === 'option_u_010927') {
            Object.keys(topJobData).forEach(key => {
                switch (key) {
                  case 'id':
                    targetElement('link').setAttribute('href', `./job/detail.html?id=${topJobData[key]}`)
                    break

                  case 'job_u_kyuzintaitoru':
                    setElement('title', topJobData[key])
                    break

                  case 'job_p_job_category':
                    for (const name in topJobData[key]) {
                      setElement('occupation', topJobData[key][name].option_p_name)
                    }
                    break

                  case 'job_u_kinmutitodoufuken':
                    for (const name in topJobData[key]) {
                      setElement('place', topJobData[key][name].option_p_name)
                    }
                    break

                  case 'job_p_min_salary':
                    setElement('minSalary', topJobData[key])
                    break

                  case 'job_p_max_salary':
                    setElement('maxSalary', topJobData[key])
                    break

                  default:
                    break
              }
            })
            targetOrigin.appendChild(_cardItemTemplate)
          }
        }
      })

      // jobcard内の「見出し」の文字数制限
      new AutoTextOmit(TEXT_TARGET_CLASS, TEXT_OMIT_SIZE)

      // jobcard内の「タイトル」の高さを揃える
      new AdjustHeightJobCardLine(TEXT_TITLE_TARGET_CLASS)

      // jobcard内の「仕事内容」の高さを揃える
      new AdjustHeightJobCardLine(TEXT_WORK_TARGET_CLASS)

      // jobcardスライダーの定義
      new Swiper(TEXT_SWIPER_TARGET_CLASS, TEXT_SWIPER_OPTION)
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default TopSuggest
