const CHANGE_EVENT = 'change'

/**
 * @class HasChecked
 * @desc 対象クラスがcheckedになっているかチェックする処理
 */
class HasChecked {
  /**
   * @constructor
   */
  constructor() {
    this.isChecked()
  }

  /**
   * @desc checkedの場合はtrueを返却、そうでない場合はエラーのクラスを追加
   */
  isChecked() {
    this.targetCheckbox = document.querySelectorAll('.js-hasChecked-target')
    this.targetCheckbox.forEach(elem => {
      elem.addEventListener(CHANGE_EVENT, () => {
        if (elem.checked === false) {
          elem.classList.add('is-error')
        }
        if (elem.checked === true) {
          elem.classList.remove('is-error')
          return true
        }
      })
    })
  }
}

export default HasChecked
