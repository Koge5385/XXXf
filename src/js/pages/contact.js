import ActivateSubmit from '../module/ActivateSubmit'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

window.addEventListener(LOAD_EVENT, () => {
  new ActivateSubmit()
})
