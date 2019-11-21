// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const INSERT_TARGET_CLASS = '.js-mailInsert-target'
const ENTRY_MAIL = 'entry_mail'


window.addEventListener(LOAD_EVENT, () => {
  const entryMail = localStorage.getItem(ENTRY_MAIL)
  document.querySelector(INSERT_TARGET_CLASS).innerHTML = entryMail
})
