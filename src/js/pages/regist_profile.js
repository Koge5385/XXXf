import RegistProfile from '../module/api/module/RegistProfile'
import ActivateSubmit from '../module/ActivateSubmit'
import FormConfirm from '../module/FormConfirm'
import Registering from '../module/Registering'
import GoMyPage from '../module/api/module/GoMyPage'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-registProfileSubmit-target'

// 会員登録フロー上にいるか判別する
new Registering()

// ログイン状態の場合はマイページに移動する処理
new GoMyPage()

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  // 確認画面の処理
  new FormConfirm()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // プロフィール登録時のAPI処理
    new RegistProfile()
  })
})
