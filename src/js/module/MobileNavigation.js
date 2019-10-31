// 定数
const CHANGE_EVENT = 'change'
const MOUSEWHEEL_EVENT = 'mousewheel'
const TOUCHMOVE_EVENT = 'touchmove'
const TEXT_TRIGGER_CLASS = '.js-navigation-trigger'

/**
 * @class MobileNavigation
 * @desc SP版ナビゲーションオープン／クローズ時の処理
 */
class MobileNavigation {
  /**
   * @constructor
   */
  constructor() {
    this.scrollControl()
  }

  /**
   * @desc SP時ナビゲーションが開いた状態にスクロールを禁止する
   */
  scrollControl() {
    this.triggerElement = document.querySelector(TEXT_TRIGGER_CLASS)

    // 関数の初期セット
    function scrollHandler(event) {
      event.preventDefault()
    }

    // checkboxをトリガーにスクロールを制御
    this.triggerElement.addEventListener(CHANGE_EVENT, () => {
      if (this.triggerElement.checked) {
        document.addEventListener(MOUSEWHEEL_EVENT, scrollHandler, {
          passive: false,
        })
        document.addEventListener(TOUCHMOVE_EVENT, scrollHandler, {
          passive: false,
        })
      } else {
        document.removeEventListener(MOUSEWHEEL_EVENT, scrollHandler, {
          passive: false,
        })
        document.removeEventListener(TOUCHMOVE_EVENT, scrollHandler, {
          passive: false,
        })
      }
    })
  }
}

export default MobileNavigation
