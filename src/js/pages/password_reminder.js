import ActivateSubmit from '../module/ActivateSubmit'
import PasswordReminder from '../module/api/module/PasswordReminder'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-reminderSubmit-target'


window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // パスワードリマインダー時の処理
    new PasswordReminder()
  })
})
