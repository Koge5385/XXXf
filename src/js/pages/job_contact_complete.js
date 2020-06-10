import JobContactMetaReplace from '../module/api/module/JobContactMetaReplace'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const ENTRY_MAIL = 'entry_mail'
const SET_PARAM_TARGET = '.js-paramSet-target'

window.addEventListener(LOAD_EVENT, () => {

  // 求人問合せのmeta情報の変更
  new JobContactMetaReplace()

  const params = new URLSearchParams(window.location.search)
  const jobId = params.get('jobId')
  document.querySelector(SET_PARAM_TARGET).setAttribute('href', `./detail.html?id=${jobId}`)
})
