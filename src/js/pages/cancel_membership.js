import LoginCheck from '../module/api/module/LoginCheck'
import CancelMembership from '../module/api/module/CancelMembership'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-cancelSubmit-target'

// ログイン判定処理
new LoginCheck()


window.addEventListener(LOAD_EVENT, () => {
  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // 退会時のAPI処理
    new CancelMembership()
  })
})
