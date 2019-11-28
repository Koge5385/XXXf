// 定数
const CLICK_EVENT = 'click'
const APPEND_TRIGGER_CLASS = '.js-inputBoxAppend-trigger'
const APPEND_TARGET_CLASS = '.js-inputBoxAppend-target'
const ADD_SHOW_CLASS = 'is-show'

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
    const appendTrigger = document.querySelector(APPEND_TARGET_CLASS)

    document.querySelector(APPEND_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {

    })
  }
}

export default InputBoxAppend
