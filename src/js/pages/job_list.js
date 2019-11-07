import JobList from '../module/api/module/JobList'

// ??
const LOAD_EVENT = 'DOMContentLoaded'
const BEFOREUNLOAD_EVENT = 'beforeunload'
const UNLOAD_EVENT = 'unload'
const PAGESHOW_EVENT = 'pageshow'

window.addEventListener(LOAD_EVENT, () => {
  // ???????API????
  new JobList()
})

// ???????????????
window.addEventListener(BEFOREUNLOAD_EVENT, () => {
  // IE?
})
window.addEventListener(UNLOAD_EVENT, () => {
  // IE???
})
window.addEventListener(PAGESHOW_EVENT, event => {
  if (event.persisted) {
    // ???????????
    new JobDetail()
  }
})
