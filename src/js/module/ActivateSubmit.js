// 定数 -> イベント
const BLUR_EVENT = 'blur'
const CHANGE_EVENT = 'change'

// 定数 -> 対象のクラス
const SUBMIT_CLASS = '.js-activate-target'
const CHECK_EMPTY_CLASS = '.js-valueEmptyCheck-target'
const CHECK_SELECTED_CLASS = '.js-isSelected-target'
const CHECK_CHECKED_CLASS = '.js-hasChecked-target'
const CHECK_ANYCHECKED_CLASS = '.js-anyChecked-target'
const CHECK_MAIL_CLASS = '.js-mailValidation-target'
const CHECK_PASSWORD_CLASS = '.js-passwordValidation-target'
const CHECK_TEL_CLASS = '.js-telValidation-target'
const ERROR_CLASS = 'is-error'

// 定数 -> メールアドレス　バリデーションフォーマット {半角英数字}@{半角英数字}
const MAIL_VALIDATE_FORMAT = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/

// 定数 -> パスワード　バリデーションフォーマット {半角[アルファベット大文字][アルファベット小文字][数字][8文字以上]}
const PASSWORD_VALIDATE_FORMAT = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/

// 定数 -> 電話番号　バリデーションフォーマット {半角[数字][7桁]}
const TEL_VALIDATE_FORMAT = /^[0-9]{7,}$/

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
        if (elem.value !== '') checkList[i] = true
        checkList.filter(x => x === true).length !== checkList.length
          ? this.checkResult.empty = false
          : this.checkResult.empty = true
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
   * @desc radioボタンが選択されていない場合にis-errorのクラスを付与
   */
  isSelected() {
    if (document.querySelector(CHECK_SELECTED_CLASS) === null) this.checkResult.radio = true

    if (document.querySelector(CHECK_SELECTED_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_SELECTED_CLASS)
      const checkList = new Array(targetArray.length)
      targetArray.forEach((elem, i) => {
        elem.addEventListener(CHANGE_EVENT, () => {
          this.checkSelected(elem, checkList, i)
        })
      })
    }
  }

  /**
   * @desc ラジオボタンが選択されているか判定する
   * @param {Object} element 対象の要素
   * @param {Array} list チェック状態を書き込む配列
   * @param {Number} index 処理番号
   */
  checkSelected(element, list, index) {
    if (!element.checked) {
      element.classList.add(ERROR_CLASS)
      list[index] = false
    }
    if (element.checked) {
      element.classList.remove(ERROR_CLASS)
      list[index] = true
    }
    list.filter(x => x === true).length > 0
      ? this.checkResult.radio = true
      : this.checkResult.radio = false
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
   * @desc 子要素の何れもcheckedでない場合にis-errorのクラスを付与
   */
  anyChecked() {
    if (document.querySelector(CHECK_ANYCHECKED_CLASS) === null) this.checkResult.anyCheck = true

    if (document.querySelector(CHECK_ANYCHECKED_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_ANYCHECKED_CLASS)
      const checkList = new Array(targetArray.length)
      targetArray.forEach((elem, i) => {
        const checkboxArray = elem.querySelectorAll('input')
        const checkChildList = new Array(checkboxArray.length)
        Array.prototype.slice.call(checkboxArray, 0).forEach((input, n) => {
          if (input.checked) checkChildList[n] = true
          if (checkChildList.filter(x => x === true).length > 0) checkList[i] = true
          checkList.filter(x => x === true).length !== checkList.length
            ? this.checkResult.anyCheck = false
            : this.checkResult.anyCheck = true
          input.addEventListener(CHANGE_EVENT, () => {
            this.hasAnyCheck(input, checkList, checkChildList, i, n)
          })
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
  hasAnyCheck(element, parentList, childList, index, subindex) {
    if (!element.checked) {
      element.classList.add(ERROR_CLASS)
      childList[subindex] = false
    }
    if (element.checked) {
      element.classList.remove(ERROR_CLASS)
      childList[subindex] = true
    }
    if (childList.filter(x => x === true).length === 0) parentList[index] = false
    if (childList.filter(x => x === true).length > 0) parentList[index] = true
    parentList.filter(x => x === true).length !== parentList.length
      ? this.checkResult.anyCheck = false
      : this.checkResult.anyCheck = true
  }

  /**
   * @desc 1つ目のメールアドレスをフォーマットを参照して検証
   */
  mailValidate() {
    if (document.querySelector(CHECK_MAIL_CLASS) === null) this.checkResult.mail = true

    if (document.querySelector(CHECK_MAIL_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_MAIL_CLASS)
      this.mailFirstInput = targetArray[0]
      this.mailSecondInput = targetArray[1]

      if (this.mailSecondInput !== undefined) {
        this.mailFirstInput.addEventListener(BLUR_EVENT, () => {
          if (!MAIL_VALIDATE_FORMAT.test(this.mailFirstInput.value)) this.mailFirstInput.classList.add(ERROR_CLASS)
          if (MAIL_VALIDATE_FORMAT.test(this.mailFirstInput.value)) {
            this.mailFirstInput.classList.remove(ERROR_CLASS)
            this.mailConfirmValidate()
          }
          this.mailSecondInput.value !== this.mailFirstInput.value
            ? this.mailSecondInput.classList.add(ERROR_CLASS)
            : this.mailSecondInput.classList.remove(ERROR_CLASS)
        })
      }

      if (this.mailSecondInput === undefined) {
        this.mailFirstInput.addEventListener(BLUR_EVENT, () => {
          if (!MAIL_VALIDATE_FORMAT.test(this.mailFirstInput.value)) {
            this.mailFirstInput.classList.add(ERROR_CLASS)
            this.checkResult.mail = false
          }
          if (MAIL_VALIDATE_FORMAT.test(this.mailFirstInput.value)) {
            this.mailFirstInput.classList.remove(ERROR_CLASS)
            this.checkResult.mail = true
          }
        })
      }

      // 初期値がある場合の処理
      if (MAIL_VALIDATE_FORMAT.test(this.mailFirstInput.value)) this.checkResult.mail = true
    }
  }

  /**
   * @desc 2つ目のメールアドレスを1つ目同様に検証し、1つ目と一致するか検証
   */
  mailConfirmValidate() {
    this.mailSecondInput.addEventListener(BLUR_EVENT, () => {
      if (!MAIL_VALIDATE_FORMAT.test(this.mailSecondInput.value) || this.mailSecondInput.value !== this.mailFirstInput.value) {
        this.mailSecondInput.classList.add(ERROR_CLASS)
        this.checkResult.mail = false
      }
      if (MAIL_VALIDATE_FORMAT.test(this.mailSecondInput.value) && this.mailSecondInput.value === this.mailFirstInput.value) {
        this.mailSecondInput.classList.remove(ERROR_CLASS)
        this.checkResult.mail = true
      }
    })
  }

  /**
   * @desc 1つ目のパスワードをフォーマットを参照して検証
   */
  passwordValidate() {
    if (document.querySelector(CHECK_PASSWORD_CLASS) === null) this.checkResult.password = true

    if (document.querySelector(CHECK_PASSWORD_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_PASSWORD_CLASS)
      this.passwordFirstInput = targetArray[0]
      this.passwordSecondInput = targetArray[1]

      if (this.passwordSecondInput !== undefined) {
        this.passwordFirstInput.addEventListener(BLUR_EVENT, () => {
          if (!PASSWORD_VALIDATE_FORMAT.test(this.passwordFirstInput.value)) this.passwordFirstInput.classList.add(ERROR_CLASS)
          if (PASSWORD_VALIDATE_FORMAT.test(this.passwordFirstInput.value)) {
            this.passwordFirstInput.classList.remove(ERROR_CLASS)
            this.passwordConfirmValidate()
          }
          this.passwordSecondInput.value !== this.passwordFirstInput.value
            ? this.passwordSecondInput.classList.add(ERROR_CLASS)
            : this.passwordSecondInput.classList.remove(ERROR_CLASS)
        })
      }

      if (this.passwordSecondInput === undefined) {
        this.passwordFirstInput.addEventListener(BLUR_EVENT, () => {
          if (!PASSWORD_VALIDATE_FORMAT.test(this.passwordFirstInput.value)) {
            this.passwordFirstInput.classList.add(ERROR_CLASS)
            this.checkResult.password = false
          }
          if (PASSWORD_VALIDATE_FORMAT.test(this.passwordFirstInput.value)) {
            this.passwordFirstInput.classList.remove(ERROR_CLASS)
            this.checkResult.password = true
          }
        })
      }
    }
  }

  /**
   * @desc 2つ目のパスワードを1つ目同様に検証し、1つ目と一致するか検証
   */
  passwordConfirmValidate() {
    this.passwordSecondInput.addEventListener(BLUR_EVENT, () => {
      if (!PASSWORD_VALIDATE_FORMAT.test(this.passwordSecondInput.value) || this.passwordSecondInput.value !== this.passwordFirstInput.value) {
        this.passwordSecondInput.classList.add(ERROR_CLASS)
        this.checkResult.password = false
      }
      if (PASSWORD_VALIDATE_FORMAT.test(this.passwordSecondInput.value) && this.passwordSecondInput.value === this.passwordFirstInput.value) {
        this.passwordSecondInput.classList.remove(ERROR_CLASS)
        this.checkResult.password = true
      }
    })
  }

  /**
   * @desc 1つ目の電話番号をフォーマットを参照して検証
   */
  telValidate() {
    if (document.querySelector(CHECK_TEL_CLASS) === null) this.checkResult.tel = true

    if (document.querySelector(CHECK_TEL_CLASS) !== null) {
      const targetArray = this.convertNode(CHECK_TEL_CLASS)
      this.telFirstInput = targetArray[0]
      this.telSecondInput = targetArray[1]

      this.telFirstInput.addEventListener(BLUR_EVENT, () => {
        if (!TEL_VALIDATE_FORMAT.test(this.telFirstInput.value)) {
          this.telFirstInput.classList.add(ERROR_CLASS)
          this.checkResult.tel = false
        }
        if (TEL_VALIDATE_FORMAT.test(this.telFirstInput.value)) {
          this.telFirstInput.classList.remove(ERROR_CLASS)
          this.checkResult.tel = true
        }
      })

      // 初期値がある場合の処理
      if (TEL_VALIDATE_FORMAT.test(this.telFirstInput.value)) this.checkResult.tel = true
    }
  }

  /**
   * @desc checkを通過したときにsubmitをactiveにする
   */
  activeSubmit() {
    const targetSubmit = document.querySelector(SUBMIT_CLASS)

    // アクティブ判定に必要なオブジェクトを作成（全てtrueだと活性化する）
    this.checkResult = { 'empty': false, 'radio': false, 'checkbox': false, 'mail': false, 'password': false, 'tel': false, 'anyCheck': false }

    // それぞれのチェック処理を走らせる
    this.isValueEmpty()
    this.isSelected()
    this.isChecked()
    this.anyChecked()
    this.mailValidate()
    this.passwordValidate()
    this.telValidate()

    if (this.checkResult.empty === true && this.checkResult.radio === true && this.checkResult.checkbox === true && this.checkResult.mail === true && this.checkResult.password === true && this.checkResult.tel === true && this.checkResult.anyCheck === true) targetSubmit.disabled = false

    const checkObject = this.checkResult
    Object.keys(checkObject).forEach(key => {
      let oldValue = checkObject[key]
      Object.defineProperty(checkObject, key, {
        get: () => oldValue,
        set: (newValue) => {
          oldValue = newValue
          checkObject.empty === true && checkObject.radio === true && checkObject.checkbox === true && checkObject.mail === true && checkObject.password === true && checkObject.tel === true && checkObject.anyCheck === true
            ? targetSubmit.disabled = false
            : targetSubmit.disabled = true
        }
      })
    })
  }
}

export default ActivateSubmit
