// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const ENTRY_MAIL = 'entry_mail'
const SET_PARAM_TARGET = '.js-paramSet-target'

window.addEventListener(LOAD_EVENT, () => {
  const params = new URLSearchParams(window.location.search)
  const jobId = params.get('jobId')
  document.querySelector(SET_PARAM_TARGET).setAttribute('href', `./detail.html?id=${jobId}`)
})
