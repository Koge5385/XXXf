const BLUR_EVENT = 'blur'
const CHANGE_EVENT = 'change'
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
   * @desc 値が空の場合にis-errorのクラスを付与
   */
  isValueEmpty() {
    const targetInput = document.querySelectorAll('.js-valueEmptyCheck-target')
    const checkList = new Array(targetInput.length)
    targetInput.forEach((elem, i) => {
      elem.addEventListener(BLUR_EVENT, () => {
        if (elem.value === '') {
          elem.classList.add('is-error')
          checkList[i] = false
        }
        if (elem.value !== '') {
          elem.classList.remove('is-error')
          checkList[i] = true
        }
        checkList.filter(x => x === true).length !== targetInput.length ? this.checkResult.empty = false : this.checkResult.empty = true
      })
    })
  }

  /**
   * @desc checkedの場合にis-errorのクラスを付与
   */
  isChecked() {
    const targetCheckbox = document.querySelectorAll('.js-hasChecked-target')
    const checkList = new Array(targetCheckbox.length)
    targetCheckbox.forEach((elem, i) => {
      elem.addEventListener(CHANGE_EVENT, () => {
        if (elem.checked === false) {
          elem.classList.add('is-error')
          checkList[i] = false
        }
        if (elem.checked === true) {
          elem.classList.remove('is-error')
          checkList[i] = true
        }
        checkList.filter(x => x === true).length !== targetCheckbox.length ? this.checkResult.checked = false : this.checkResult.checked = true
      })
    })
  }

  /**
   * @desc 1つ目のメールアドレスをフォーマットを参照して検証
   */
  mailValidate() {
    this.targetValue = document.querySelectorAll('.js-mailValidation-target')
    this.firstInput = this.targetValue[0]
    this.secondInput = this.targetValue[1]

    this.firstInput.addEventListener(BLUR_EVENT, () => {
      if (VALIDATE_FORMAT.test(this.firstInput.value) === false) {
        this.firstInput.classList.add('is-error')
      }
      if (VALIDATE_FORMAT.test(this.firstInput.value) === true) {
        this.firstInput.classList.remove('is-error')
        this.confirmValidate()
      }

      this.secondInput.value !== this.firstInput.value ? this.secondInput.classList.add('is-error') : this.secondInput.classList.remove('is-error')
    })
  }

  /**
   * @desc 2つ目のメールアドレスを1つ目同様に検証し、1つ目と一致するか検証
   */
  confirmValidate() {
    this.secondInput.addEventListener(BLUR_EVENT, () => {
      if (VALIDATE_FORMAT.test(this.secondInput.value) === false || this.secondInput.value !== this.firstInput.value) {
        this.secondInput.classList.add('is-error')
        this.checkResult.mail = false
      }
      if (VALIDATE_FORMAT.test(this.secondInput.value) === true && this.secondInput.value === this.firstInput.value) {
        this.secondInput.classList.remove('is-error')
        this.checkResult.mail = true
      }
    })
  }

  /**
   * @desc checkを通過したときにsubmitをactiveにする
   */
  activeSubmit() {
    const targetSubmit = document.querySelector('.js-formSubmit-target')
    this.checkResult = { 'empty': false, 'checked': false, 'mail': false }
    this.isValueEmpty()
    this.isChecked()
    this.mailValidate()

    const checkObject = this.checkResult
    Object.keys(checkObject).forEach(key => {
      Object.defineProperty(checkObject, key, {
        get: () => this[key],
        set: (newValue) => {
          this[key] = newValue
          checkObject.empty === true && checkObject.checked === true && checkObject.mail === true
            ? targetSubmit.disabled = false
            : targetSubmit.disabled = true
        }
      })
    })
  }
}

export default ActivateSubmit
