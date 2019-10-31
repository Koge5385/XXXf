import JobDetail from '../module/api/module/JobDetail'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const BEFOREUNLOAD_EVENT = 'beforeunload'
const UNLOAD_EVENT = 'unload'
const PAGESHOW_EVENT = 'pageshow'

window.addEventListener(LOAD_EVENT, () => {
  // 求人詳細情報のAPI呼び出し
  new JobDetail()
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
    new JobDetail()
  }
})
