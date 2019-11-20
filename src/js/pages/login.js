import Login from '../module/api/module/Login'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET = '.js-async-loginSubmit-target'


window.addEventListener(LOAD_EVENT, () => {
  document.querySelector(SUBMIT_TARGET).addEventListener(CLICK_EVENT, () => {
    // ログイン時のAPI処理
    new Login()
  })
})
