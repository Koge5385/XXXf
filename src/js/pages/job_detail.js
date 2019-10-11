import BreadcrumbDefaultSet from '../module/BreadcrumbDefaultSet'
import MobileNavigation from '../module/MobileNavigation'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // SP版ナビゲーションオープン／クローズ時の処理
  new MobileNavigation()
  // パンくずリストのスクロール位置を右端にセット
  new BreadcrumbDefaultSet()
})
