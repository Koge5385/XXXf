import PasswordChange from '../module/api/module/PasswordChange'
import LoginCheck from '../module/api/module/LoginCheck'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET = '.js-async-passwordChangeSubmit-target'

// ログイン判定処理
new LoginCheck()

window.addEventListener(LOAD_EVENT, () => {
  document.querySelector(SUBMIT_TARGET).addEventListener(CLICK_EVENT, () => {
    // パスワード変更のAPIリクエスト処理
    new PasswordChange()
  })
})
