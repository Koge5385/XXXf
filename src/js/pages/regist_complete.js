// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const ENTRY_MAIL = 'entry_mail'


window.addEventListener(LOAD_EVENT, () => {
  localStorage.removeItem(ENTRY_MAIL)
})
