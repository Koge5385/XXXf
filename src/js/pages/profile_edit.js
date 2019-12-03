import LoginCheck from '../module/api/module/LoginCheck'
import SetProfileData from '../module/api/module/SetProfileData'
import EditProfile from '../module/api/module/EditProfile'
import MailUpdate from '../module/api/module/MailUpdate'
import FormConfirm from '../module/FormConfirm'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const CLICK_EVENT = 'click'
const FORM_SUBMIT_TARGET_CLASS = '.js-async-editProfileSubmit-target'

// ログイン判定処理
new LoginCheck()

window.addEventListener(LOAD_EVENT, () => {
  // メールアドレス更新時の処理
  new MailUpdate()

  // プロフィール編集の初期値設定処理
  new SetProfileData()

  // 確認画面の処理
  new FormConfirm()

  document.querySelector(FORM_SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
    // プロフィール更新のAPIの処理
    new EditProfile()
  })
})
