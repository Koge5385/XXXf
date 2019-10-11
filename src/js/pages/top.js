import AxiosBase from '../module/AxiosBase'
import MobileNavigation from '../module/MobileNavigation'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // SP版ナビゲーションオープン／クローズ時の処理
  new MobileNavigation()
  // API連携テスト
  new AxiosBase()
})
