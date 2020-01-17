import JobContact from '../module/api/module/JobContact'
import ActivateSubmit from '../module/ActivateSubmit'
import FormConfirm from '../module/FormConfirm'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-jobContactSubmit-target'
const JOBDETAILHREF_TARGET_CLASS = '.js-async-jobContactHref-target'

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  // 確認画面の処理
  new FormConfirm()

  // パンくずエリアの求人詳細URLの書き換え処理
  const params = new URLSearchParams(window.location.search)
  const jobId = params.get('jobId')
  const targetElement = document.querySelector(JOBDETAILHREF_TARGET_CLASS)
  targetElement.setAttribute('href', `/job/detail.html?id=${jobId}`)

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // 求人問い合わせ送信時のAPI処理
    new JobContact()
  })
})
