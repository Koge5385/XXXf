const TEXT_TRIGGER_ID = 'sp_nav'

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
    this.triggerElement = document.getElementById(TEXT_TRIGGER_ID)

    // 初期設定関数の設定
    function scrollHandler(event) {
      event.preventDefault()
    }

    // checkboxをトリガーにスクロールを制御
    this.triggerElement.addEventListener('change', () => {
      if (this.triggerElement.checked) {
        document.addEventListener('mousewheel', scrollHandler, {passive: false})
        document.addEventListener('touchmove', scrollHandler, {passive: false})
      } else {
        document.removeEventListener('mousewheel', scrollHandler, {passive: false})
        document.removeEventListener('touchmove', scrollHandler, {passive: false})
      }
    })
  }
}

export default MobileNavigation
