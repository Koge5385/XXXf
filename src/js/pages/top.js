import MobileNavigation from '../module/MobileNavigation'
import UserNavigation from '../module/api/module/UserNavigation'
import TopSuggest from '../module/api/module/TopSuggest'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // ログイン状態に応じてナビゲーションの出し分けを行う
  new UserNavigation()

  // SP版ナビゲーションオープン／クローズ時の処理
  new MobileNavigation()

  // おすすめ求人のAPI処理
  new TopSuggest()
})
