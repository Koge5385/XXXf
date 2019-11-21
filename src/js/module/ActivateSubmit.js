// 定数 -> イベント
const BLUR_EVENT = 'blur'
const CHANGE_EVENT = 'change'

// 定数 -> 対象のクラス
const SUBMIT_CLASS = '.js-formSubmit-target'
const CHECK_EMPTY_CLASS = '.js-valueEmptyCheck-target'
const CHECK_CHECKED_CLASS = '.js-hasChecked-target'
const CHECK_MAIL_CLASS = '.js-mailValidation-target'
const ERROR_CLASS = 'is-error'

// 定数 -> バリデーションフォーマット {半角英数字}@{半角英数字}
const VALIDATE_FORMAT = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/

/**
 * @class ActivateSubmit
 * @desc submitボタンをアクティブにする判定
 */
class ActivateSubmit {
  /**
   * @constructor
   */
  constructor() {
    this.activeSubmit()
  }

  /**
   * @desc 対象のNodeListをArrayに変換して返却（IE対応）
   * @param {String} className 対象のクラス名
   */
  convertNode(className) {
    const targetNode = document.querySelectorAll(className)
    return Array.prototype.slice.call(targetNode,0)
  }

  /**
   * @desc 値が空の場合にis-errorのクラスを付与
   */
  isValueEmpty() {
    if (document.querySelector(CHECK_EMPTY_CLASS) === null) this.checkResult.empty = true

    if(document.querySelector(CHECK_EMPTY_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_EMPTY_CLASS)
      const checkList = new Array(targetArray.length)
      targetArray.forEach((elem, i) => {
        elem.addEventListener(BLUR_EVENT, () => {
          this.checkEmpty(elem, checkList, i)
        })
      })
    }
  }

  /**
   * @desc 値が空の要素であるか判定する
   * @param {Object} element 対象の要素
   * @param {Array} list チェック状態を書き込む配列
   * @param {Number} index 処理番号
   */
  checkEmpty(element, list, index) {
    if (element.value === '') {
      element.classList.add(ERROR_CLASS)
      list[index] = false
    }
    if (element.value !== '') {
      element.classList.remove(ERROR_CLASS)
      list[index] = true
    }
    list.filter(x => x === true).length !== list.length
      ? this.checkResult.empty = false
      : this.checkResult.empty = true
  }

  /**
   * @desc checkedの場合にis-errorのクラスを付与
   */
  isChecked() {
    if (document.querySelector(CHECK_CHECKED_CLASS) === null) this.checkResult.checkbox = true

    if (document.querySelector(CHECK_CHECKED_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_CHECKED_CLASS)
      const checkList = new Array(targetArray.length)
      targetArray.forEach((elem, i) => {
        elem.addEventListener(CHANGE_EVENT, () => {
          this.hasCheck(elem, checkList, i)
        })
      })
    }
  }

  /**
   * @desc チェックが入っているか判定する
   * @param {Object} element 対象の要素
   * @param {Array} list チェック状態を書き込む配列
   * @param {Number} index 処理番号
   */
  hasCheck(element, list, index) {
    if (!element.checked) {
      element.classList.add(ERROR_CLASS)
      list[index] = false
    }
    if (element.checked) {
      element.classList.remove(ERROR_CLASS)
      list[index] = true
    }
    list.filter(x => x === true).length !== list.length
      ? this.checkResult.checkbox = false
      : this.checkResult.checkbox = true
  }

  /**
   * @desc 1つ目のメールアドレスをフォーマットを参照して検証
   */
  mailValidate() {
    if (document.querySelector(CHECK_MAIL_CLASS) === null) this.checkResult.mail = true

    if (document.querySelector(CHECK_MAIL_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_MAIL_CLASS)
      this.firstInput = targetArray[0]
      this.secondInput = targetArray[1]

      this.firstInput.addEventListener(BLUR_EVENT, () => {
        if (!VALIDATE_FORMAT.test(this.firstInput.value)) this.firstInput.classList.add(ERROR_CLASS)
        if (VALIDATE_FORMAT.test(this.firstInput.value)) {
          this.firstInput.classList.remove(ERROR_CLASS)
          this.confirmValidate()
        }
        this.secondInput.value !== this.firstInput.value
          ? this.secondInput.classList.add(ERROR_CLASS)
          : this.secondInput.classList.remove(ERROR_CLASS)
      })
    }
  }

  /**
   * @desc 2つ目のメールアドレスを1つ目同様に検証し、1つ目と一致するか検証
   */
  confirmValidate() {
    this.secondInput.addEventListener(BLUR_EVENT, () => {
      if (!VALIDATE_FORMAT.test(this.secondInput.value) || this.secondInput.value !== this.firstInput.value) {
        this.secondInput.classList.add(ERROR_CLASS)
        this.checkResult.mail = false
      }
      if (VALIDATE_FORMAT.test(this.secondInput.value) && this.secondInput.value === this.firstInput.value) {
        this.secondInput.classList.remove(ERROR_CLASS)
        this.checkResult.mail = true
      }
    })
  }

  /**
   * @desc checkを通過したときにsubmitをactiveにする
   */
  activeSubmit() {
    const targetSubmit = document.querySelector(SUBMIT_CLASS)

    // アクティブ判定に必要なオブジェクトを作成（全てtrueだと活性化する）
    this.checkResult = { 'empty': false, 'checkbox': false, 'mail': false }

    // それぞれのチェック処理を走らせる
    this.isValueEmpty()
    this.isChecked()
    this.mailValidate()

    if (this.checkResult.empty === true && this.checkResult.checkbox === true && this.checkResult.mail === true) targetSubmit.disabled = false

    const checkObject = this.checkResult
    Object.keys(checkObject).forEach(key => {
      let oldValue = checkObject[key]
      Object.defineProperty(checkObject, key, {
        get: () => oldValue,
        set: (newValue) => {
          oldValue = newValue
          checkObject.empty === true && checkObject.checkbox === true && checkObject.mail === true
            ? targetSubmit.disabled = false
            : targetSubmit.disabled = true
        }
      })
    })
  }
}

export default ActivateSubmit
