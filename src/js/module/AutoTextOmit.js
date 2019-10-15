/**
 * @class AutoTextOmit
 * @desc 3点リーダー処理
 */
class AutoTextOmit {
  /**
   * @constructor
   * @param {String} targetClass 対象のクラス名
   * @param {Number} textSize 制限する文字数
   */
  constructor(targetClass, textSize) {
    this.getTextArray(targetClass)
    this.textOmit(textSize)
  }

  /**
   * @desc 対象のテキストを取得して配列化
   * @param {String} targetClass 対象のクラス名
   */
  getTextArray(targetClass) {
    this.targetElement = document.querySelectorAll(targetClass)
    this.targetArray = []
    this.targetElement.forEach(elem => {
      this.targetArray.push(elem)
    })
  }
  /**
   * @desc 指定の文字数以上だった場合は3点リーダーを適用
   * @param {Number} textSize 制限する文字数
   */
  textOmit(textSize) {
    this.targetArray.forEach(elem => {
      const textLength = elem.innerText.length
      if (textLength > textSize) {
        elem.innerText = elem.innerText.substr(0, textSize)
        elem.append('…')
      }
    })
  }
}

export default AutoTextOmit
