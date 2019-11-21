import CreateAccount from '../module/api/module/CreateAccount'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // メールアドレス登録時の処理
  new CreateAccount()
})
