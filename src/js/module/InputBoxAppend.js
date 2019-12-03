// 定数
const CLICK_EVENT = 'click'
const APPEND_TRIGGER_CLASS = '.js-inputBoxAppend-trigger'
const APPEND_TARGET_CLASS = '.js-inputBoxAppend-target'
const ADD_SHOW_CLASS = 'is-show'
const ADD_HIDE_CLASS = 'is-hidden'

/**
 * @class InputBoxAppend
 * @desc 入力枠追加処理
 */
class InputBoxAppend {
  /**
   * @constructor
   */
  constructor() {
    this.textareaAppend()
  }

  /**
   * @desc レジュメ画面のテキストエリア追加処理
   */
  textareaAppend() {
    const targetNode = document.querySelectorAll(APPEND_TARGET_CLASS)
    const targetArray = Array.prototype.slice.call(targetNode, 0)
    const firstTarget = targetArray[0]
    const secondTarget = targetArray[1]
    const appendTrigger = document.querySelector(APPEND_TRIGGER_CLASS)
    let clickCount = 0

    appendTrigger.addEventListener(CLICK_EVENT, () => {
      clickCount++
      if (clickCount === 1) {
        firstTarget.classList.remove(ADD_HIDE_CLASS)
        firstTarget.classList.add(ADD_SHOW_CLASS)
      }
      if (clickCount === 2) {
        secondTarget.classList.remove(ADD_HIDE_CLASS)
        secondTarget.classList.add(ADD_SHOW_CLASS)
        appendTrigger.classList.add(ADD_HIDE_CLASS)
      }
    })
  }
}

export default InputBoxAppend
