/**
 * @class AdjustHeightJobCardLine
 * @desc jobcard内「見出し」と「仕事内容」の高さを揃える
 */
class AdjustHeightJobCardLine {
  /**
   * @constructor
   * @param {String} targetClass 対象のクラス名
   */
  constructor(targetClass) {
    this.setParameter(targetClass)
    this.maxHeight()
  }

  /**
   * @desc 取得した全要素の最大の高さの取得処理
   * @param {String} targetClass 対象のクラス名
   */
  setParameter(targetClass) {
    this.targetElements = document.querySelectorAll(targetClass)
    this.HeightArray = []
    this.HeightNodeArray = Array.prototype.slice.call(this.targetElements, 0)
    this.HeightNodeArray.forEach(elem => {
      this.HeightArray.push(elem.clientHeight)
    })
    this.targetMaxHeight = Math.max.apply(null, this.HeightArray)
  }
  /**
   * @desc 取得した全要素に最大の高さを反映
   */
  maxHeight() {
    this.targetElements.forEach(elem => {
      elem.style.height = `${this.targetMaxHeight}px`
    })
  }
}

export default AdjustHeightJobCardLine
