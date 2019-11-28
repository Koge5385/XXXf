import Registering from '../module/Registering'
import GoMyPage from '../module/api/module/GoMyPage'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

// 会員登録フロー上にいるか判別する
new Registering()

// ログイン状態の場合はマイページに移動する処理
new GoMyPage()

window.addEventListener(LOAD_EVENT, () => {
})
