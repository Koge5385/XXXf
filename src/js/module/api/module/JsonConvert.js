/**
 * @class JsonConvert
 * @desc 対象のフォームデータを取得してJSONを返す
 */
class JsonConvert {
  /**
   * @constructor
   * @param {string} targetFormClass 対象フォームのクラス名
   */
  constructor(targetFormClass) {
    this.targetFormClass = targetFormClass
  }

  /**
   * @desc FormDataのオブジェクトをJSONに変換・返却する
   */
  objectConvert() {
    const jsonObject = {}
    const formData = new FormData(document.querySelector(this.targetFormClass))
    formData.forEach((value, key) => {
      jsonObject[key] = value
    })
    const convertData = JSON.stringify(jsonObject)
    return convertData
  }
}

export default JsonConvert
