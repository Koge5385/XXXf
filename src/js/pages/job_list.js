import JobList from '../module/api/module/JobList'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const BEFOREUNLOAD_EVENT = 'beforeunload'
const UNLOAD_EVENT = 'unload'
const PAGESHOW_EVENT = 'pageshow'

window.addEventListener(LOAD_EVENT, () => {
  // 求人一覧情報のAPI呼び出し
  new JobList()
})

// ブラウザバック時のイベント処理
window.addEventListener(BEFOREUNLOAD_EVENT, () => {
  // IE用
})
window.addEventListener(UNLOAD_EVENT, () => {
  // IE以外用
})
window.addEventListener(PAGESHOW_EVENT, event => {
  if (event.persisted) {
    // ページ表示の際に再発火
    new JobList()
  }
})
