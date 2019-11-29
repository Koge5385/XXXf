// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const MYPAGE_LINK_TARGET_CLASS = '.js-loginLink-target'
const LOGIN_LINK_TARGET_CLASS = '.js-loginLink-target'
const ADD_HIDE_CLASS = 'is-hidden'

window.addEventListener(LOAD_EVENT, () => {
  const params = new URLSearchParams(window.location.search)
  const jobId = params.get('token')
  jobId === null
    ? document.querySelector(MYPAGE_LINK_TARGET_CLASS).classList.remove(ADD_HIDE_CLASS)
    : document.querySelector(LOGIN_LINK_TARGET_CLASS).classList.remove(ADD_HIDE_CLASS)
})
