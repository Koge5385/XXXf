import CreateAccount from '../module/api/module/CreateAccount'
import ActivateSubmit from '../module/ActivateSubmit'
import GoMyPage from '../module/api/module/GoMyPage'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-entrySubmit-target'

// ログイン状態の場合はマイページに移動する処理
new GoMyPage()

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // メールアドレス登録時の処理
    new CreateAccount()
  })
})
