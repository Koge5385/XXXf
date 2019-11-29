import ServiceContact from '../module/api/module/ServiceContact'
import ActivateSubmit from '../module/ActivateSubmit'
import FormConfirm from '../module/FormConfirm'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const SUBMIT_TARGET_CLASS = '.js-async-serviceContactSubmit-target'

window.addEventListener(LOAD_EVENT, () => {
  // submitボタンの活性化処理
  new ActivateSubmit()

  // 確認画面の処理
  new FormConfirm()

  document.querySelector(SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // 医療機関採用担当者の方へお問い合わせ送信時のAPI処理
    new ServiceContact()
  })
})
