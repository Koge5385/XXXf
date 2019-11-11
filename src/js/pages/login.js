import Login from '../module/api/module/Login'
import LoginCheck from '../module/api/module/LoginCheck'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET = document.querySelector('.js-async-loginSubmit-target')

// ログイン判定処理
new LoginCheck()

window.addEventListener(LOAD_EVENT, () => {
  SUBMIT_TARGET.addEventListener(CLICK_EVENT, () => {
    new Login()
  })
})
