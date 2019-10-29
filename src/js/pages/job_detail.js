import JobDetail from '../module/api/module/JobDetail'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const PAGESHOW_EVENT = 'pageshow'

window.addEventListener(LOAD_EVENT, () => {
  // 求人詳細情報のAPI呼び出し
  new JobDetail()
})

// ブラウザバック時のキャッシュ対策
window.onbeforeunload = function() {
}
window.onunload = function() {
}
window.addEventListener(PAGESHOW_EVENT, event =>{
  if (event.persisted) {
    window.location.reload();
  }
})
