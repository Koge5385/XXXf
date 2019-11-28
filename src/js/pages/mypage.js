import LoginCheck from '../module/api/module/LoginCheck'
import Logout from '../module/api/module/Logout'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const REGISTERING_FLAG = 'entry_mail'
const LOGOUT_TARGET = '.js-async-logout-target'

// ログイン判定処理
new LoginCheck()

window.addEventListener(LOAD_EVENT, () => {
  // 会員登録フロー上を示すフラグの削除
  localStorage.removeItem(REGISTERING_FLAG)

  document.querySelector(LOGOUT_TARGET).addEventListener(CLICK_EVENT, () => {
    // ログアウトのconfirmを出現させる
    new Logout()
  })
})
