import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const MYPAGE_HREF = '../mypage/'
const ADD_SHOW_CLASS = 'is-show'
const FORM_TARGET_CLASS = '.js-async-loginForm-target'
const REJECT_TARGET_CLASS = '.js-async-loginReject-target'
const SUBMIT_TARGET_CLASS = '.js-async-loginSubmit-target'

/**
 * @class Login
 * @desc ログイン時の処理
 */
class Login {
  /**
   * @constructor
   */
  constructor() {
    document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "none"
    document.querySelector(SUBMIT_TARGET_CLASS).disabled = true
    this.doAxios()
  }

  /**
   * @desc パラメーターを取得してAPI実行
   */
  async doAxios() {
    const sendObject = new JsonConvert(FORM_TARGET_CLASS)
    await new AxiosBase().postMethod('/user/sessions/login', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    const params = new URLSearchParams(window.location.search)
    const fromjobDetail = params.get('jobId')

    if (status === 200) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      document.querySelector(REJECT_TARGET_CLASS).classList.remove(ADD_SHOW_CLASS)
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token)

      // 求人詳細からログインしたユーザーは該当のページに戻す
      if(fromjobDetail !== null) document.location.href = `../job/detail.html?id=${fromjobDetail}`
      if(fromjobDetail === null) document.location.href = MYPAGE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      document.querySelector(SUBMIT_TARGET_CLASS).style.pointerEvents = "auto"
      document.querySelector(SUBMIT_TARGET_CLASS).disabled = false
      document.querySelector(REJECT_TARGET_CLASS).classList.add(ADD_SHOW_CLASS)
    }
  }
}

export default Login
