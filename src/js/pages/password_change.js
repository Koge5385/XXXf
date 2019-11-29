import PasswordChange from '../module/api/module/PasswordChange'
import ActivateSubmit from '../module/ActivateSubmit'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET = '.js-async-passwordChangeSubmit-target'

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  document.querySelector(SUBMIT_TARGET).addEventListener(CLICK_EVENT, () => {
    // パスワード変更のAPIリクエスト処理
    new PasswordChange()
  })
})
