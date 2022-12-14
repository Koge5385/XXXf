import CreateAccount from '../module/api/module/CreateAccount'
import ActivateSubmit from '../module/ActivateSubmit'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-entrySubmit-target'

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // メールアドレス登録時の処理
    new CreateAccount()
  })
})
