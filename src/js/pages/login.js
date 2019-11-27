import Login from '../module/api/module/Login'
import GoMyPage from '../module/api/module/GoMyPage'
import ActivateSubmit from '../module/ActivateSubmit'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-loginSubmit-target'

// ログインページ用の状態判別
new GoMyPage()

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // ログイン時のAPI処理
    new Login()
  })
})
