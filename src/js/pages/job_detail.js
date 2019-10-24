import JobDetail from '../module/api/module/JobDetail'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  // 求人詳細情報のAPI呼び出し
  new JobDetail()
})
