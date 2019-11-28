import Registering from '../module/Registering'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const INSERT_TARGET_CLASS = '.js-mailInsert-target'
const ENTRY_MAIL = 'entry_mail'

// 会員登録フロー上にいるか判別する
new Registering()

window.addEventListener(LOAD_EVENT, () => {
  // 指定の箇所に登録されたメールアドレスを表示する
  const entryMail = localStorage.getItem(ENTRY_MAIL)
  document.querySelector(INSERT_TARGET_CLASS).innerHTML = entryMail
})
