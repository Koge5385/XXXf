/**
 * @class JobListPagenation
 * @desc 求人一覧のページネーション作成
 */
class JobListPagenation {
  /**
   * @constructor
   * @param {Number} total APIレスポンス「data.attributes.total」のデータ
   * @param {Number} start APIレスポンス「data.attributes.start」のデータ
   */
  constructor(total, start) {
    this.getElement()
    this.setParam(total, start)
    this.createPagenation()
  }

  /**
   * @desc 対象となる親要素の取得
   */
  getElement() {
    this.pagenationTarget = document.querySelector('.js-async-pagenation-target')
  }

  /**
   * @desc 引数（データ）からページ数と現在のページ数をセットし、ページ分の要素を持った配列を作成
   * @param {Number} total APIレスポンス「data.attributes.total」のデータ
   * @param {Number} start APIレスポンス「data.attributes.start」のデータ
   */
  setParam(total, start) {
    this.maxPageNumber = Math.ceil(total / 10)
    this.activeNumber = Math.ceil(start / 10)
    this.pageNumberArray = Array.from(new Array(this.maxPageNumber)).map((v, i) => i)
  }

  /**
   * @desc ページネーションDOMの生成
   */
  createPagenation() {
    this.pageNumberArray.forEach(elem => {
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
      if (elem === this.activeNumber) pagenationItem.classList.add('is-active')
      if (elem === this.activeNumber + 2 || elem === this.activeNumber + 3 || elem === this.activeNumber + 4 || elem === this.activeNumber - 2 || elem === this.activeNumber - 3 || elem === this.activeNumber - 4) pagenationItem.classList.add('pc-view')

      // 現在のページ数に応じて要素の出し分け
      if (this.pageNumberArray.length <= 5){
        pagenationItem.classList.remove('pc-view')
        this.pagenationTarget.appendChild(pagenationItem)
      }
      if (this.pageNumberArray.length > 5 && this.activeNumber <= 5) {
        if (elem === 0) {
          pagenationItem.classList.remove('pc-view')
          this.pagenationTarget.appendChild(pagenationItem)
        }
        if (elem === 1 && this.activeNumber > 2) {
          pagenationDotItem.classList.add('sp-view')
          this.pagenationTarget.appendChild(pagenationDotItem)
        }
        if (this.activeNumber <= 2 && elem <= 3) {
          pagenationItem.classList.remove('pc-view')
        }
        if (elem <= this.activeNumber + 4 && elem >= this.activeNumber - 4) this.pagenationTarget.appendChild(pagenationItem)
        if (elem === this.maxPageNumber - 1 && this.activeNumber < this.maxPageNumber - 6) this.pagenationTarget.appendChild(pagenationDotItem)
        if (elem === this.maxPageNumber - 1) this.pagenationTarget.appendChild(pagenationItem)
      }
      if (this.pageNumberArray.length > 5 && this.activeNumber >= this.maxPageNumber - 5){
        if (elem === 0) this.pagenationTarget.appendChild(pagenationItem)
        if (elem === 0 && this.activeNumber > 5) this.pagenationTarget.appendChild(pagenationDotItem)
        if (elem <= this.activeNumber + 4 && elem >= this.activeNumber - 4) this.pagenationTarget.appendChild(pagenationItem)
        if (this.activeNumber >= this.maxPageNumber - 3 && elem >= this.maxPageNumber - 4) {
          pagenationItem.classList.remove('pc-view')
        }
        if (elem === this.maxPageNumber - 1 && this.activeNumber < this.maxPageNumber - 3) {
          pagenationDotItem.classList.add('sp-view')
          this.pagenationTarget.appendChild(pagenationDotItem)
        }
        if (elem === this.maxPageNumber - 1) {
          pagenationItem.classList.remove('pc-view')
          this.pagenationTarget.appendChild(pagenationItem)
        }
      }
      if (this.pageNumberArray.length > 5 && this.activeNumber > 5 && this.activeNumber < this.maxPageNumber - 5){
        if (elem === 0) {
          this.pagenationTarget.appendChild(pagenationItem)
          this.pagenationTarget.appendChild(pagenationDotItem)
        }
        if (elem <= this.activeNumber + 4 && elem >= this.activeNumber - 4) this.pagenationTarget.appendChild(pagenationItem)
        if (elem === this.maxPageNumber - 1) {
          this.pagenationTarget.appendChild(pagenationDotItem)
          this.pagenationTarget.appendChild(pagenationItem)
        }
      }
    })
    this.holdParam()
  }

  /**
   * @desc ページネーションクリック時、パラメーターを維持する処理
   */
  holdParam() {
    const params = new URLSearchParams(window.location.search)
    const pagenationNode = document.querySelectorAll('.js-async-pagenationItem-target')
    const pagenationArray = Array.prototype.slice.call(pagenationNode, 0)
    pagenationArray.forEach(elem => {
      elem.addEventListener('click', () => {
        params.set('start', elem.value)
        document.location.search = params
      })
    })
  }
}

export default JobListPagenation
