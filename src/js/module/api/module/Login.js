import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const MYPAGE_HREF = '../mypage/'
const FORM_TARGET_CLASS = '.js-async-loginForm-target'

/**
 * @class Login
 * @desc ログイン時の処理
 */
class Login {
  /**
   * @constructor
   */
  constructor() {
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
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token)

      // 求人詳細からログインしたユーザーは該当のページに戻す
      if(fromjobDetail !== null) document.location.href = `../job/detail.html?id=${fromjobDetail}`
      if(fromjobDetail === null) document.location.href = MYPAGE_HREF
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default Login
