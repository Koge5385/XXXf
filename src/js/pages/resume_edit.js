import LoginCheck from '../module/api/module/LoginCheck'
import SetResumeData from '../module/api/module/SetResumeData'
import EditResume from '../module/api/module/EditResume'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const FORM_SUBMIT_TARGET_CLASS = '.js-async-editResumeSubmit-target'

// ログイン判定処理
new LoginCheck()


window.addEventListener(LOAD_EVENT, () => {
  // プロフィール編集の初期値設定処理
  new SetResumeData()

  document.querySelector(FORM_SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // プロフィール更新のAPIの処理
    new EditResume()
  })
})
