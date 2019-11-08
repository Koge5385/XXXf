const BLUR_EVENT = 'blur'
const VALIDATE_FORMAT = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+\/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/

/**
 * @class MailAddressValidation
 * @desc 対象クラスのメールアドレスのフォーマットをチェックする処理
 */
class MailAddressValidation {
  /**
   * @constructor
   */
  constructor() {
    this.formatValidate()
  }

  /**
   * @desc フォーマットを参照して当てはまらない場合はエラー、当てはまる場合はtrueを返却
   */
  formatValidate() {
    this.targetValue = document.querySelectorAll('.js-mailValidation-target')
    this.targetValue.forEach((elem, index) => {
      elem.addEventListener(BLUR_EVENT, () => {
        if (VALIDATE_FORMAT.test(elem.value) === false) {
          elem.classList.add('is-error')
        }
        if (VALIDATE_FORMAT.test(elem.value) === true) {
          elem.classList.remove('is-error')
          if(index === 1)this.matchValidate()
        }
      })
    })
  }

  /**
   * @desc メールアドレスの一致を検証する
   */
  matchValidate() {
    if (this.targetValue[1].value !== this.targetValue[0].value) {
      this.targetValue[1].classList.add('is-error')
    }
    if (this.targetValue[1].value === this.targetValue[0].value) {
      this.targetValue[1].classList.remove('is-error')
      return true
    }
  }
}

export default MailAddressValidation
