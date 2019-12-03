import Registering from '../module/Registering'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

// 会員登録フロー上にいるか判別する
new Registering()

window.addEventListener(LOAD_EVENT, () => {
})
