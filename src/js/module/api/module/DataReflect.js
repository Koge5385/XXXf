/**
 * @class DataReflect
 * @desc APIからのデータをページに反映する
 */
class DataReflect {
  /**
   * @constructor
   */
  constructor() {
    this.reflect()
  }

  /**
   * @desc 指定した要素に値を反映する
   * @param {string} keys ループの引数（key）を入れる
   * @param {string} dataName 処理したい対象のJSONデータ名
   * @param {string} targetName ターゲットのクラス名
   * @param {string} value ページに反映したい値
   */
  reflect(keys, dataName, targetName, value) {
    switch (keys) {
      case `${dataName}`:
        this.render(`.js-async-${targetName}-target`, value.replace(/\r?\n/g, '<br>'))
        break
      default:
        break
    }
  }
  /**
   * @desc 指定した要素に値を反映する
   * @param {string} className ターゲットの要素名
   * @param {string} result 表示する最終のテキスト
   */
  render(className, result) {
    if (!document.querySelector(className).classList.contains(className.slice(1))) return
    document.querySelector(className).innerHTML = result
  }
}

export default DataReflect
