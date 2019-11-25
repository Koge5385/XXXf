import BreadcrumbDefaultSet from './module/BreadcrumbDefaultSet'
import MobileNavigation from './module/MobileNavigation'
import UserNavigation from './module/api/module/UserNavigation'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // ログイン状態に応じてナビゲーションの出し分けを行う
  new UserNavigation()

  // SP版ナビゲーションオープン／クローズ時の処理
  new MobileNavigation()

  // パンくずリストのスクロール位置を右端にセット
  new BreadcrumbDefaultSet()
})
