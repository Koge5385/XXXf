import LoginCheck from '../module/api/module/LoginCheck'
import Logout from '../module/api/module/Logout'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const LOGOUT_TARGET = '.js-async-logout-target'

// ログイン判定処理
new LoginCheck()

window.addEventListener(LOAD_EVENT, () => {
  document.querySelector(LOGOUT_TARGET).addEventListener(CLICK_EVENT, () => {
    // ログアウトのconfirmを出現させる
    new Logout()
  })
})
