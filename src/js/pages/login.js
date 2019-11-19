import Login from '../module/api/module/Login'

// ??
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET = document.querySelector('.js-async-loginSubmit-target')


window.addEventListener(LOAD_EVENT, () => {
  SUBMIT_TARGET.addEventListener(CLICK_EVENT, () => {
    // ??????API??
    new Login()
  })
})
