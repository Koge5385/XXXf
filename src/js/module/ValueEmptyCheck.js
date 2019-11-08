const BLUR_EVENT = 'blur'

/**
 * @class ValueEmptyCheck
 * @desc 対象クラスのvalueをチェックする処理
 */
class ValueEmptyCheck {
  /**
   * @constructor
   */
  constructor() {
    this.isValueEmpty()
  }

  /**
   * @desc 値が空の場合はfalse、入力されていたらtrueを返却
   */
  isValueEmpty() {
    this.targetInput = document.querySelectorAll('.js-valueEmptyCheck-target')
    this.targetInput.forEach(elem => {
      elem.addEventListener(BLUR_EVENT, () => {
        if (elem.value === '') {
          elem.classList.add('is-error')
        }
        if (elem.value !== '') {
          elem.classList.remove('is-error')
          return true
        }
      })
    })
  }
}

export default ValueEmptyCheck
