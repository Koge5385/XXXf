import AxiosBase from '../AxiosBase'

// 定数
const ACCESS_TOKEN = 'access_token'
const ADD_SHOW_CLASS = 'is-show'
const HEADER_LOGIN_NAVI_TARGET = '.js-async-loginNavigation-target'
const HEADER_LOGOUT_NAVI_TARGET = '.js-async-logoutNavigation-target'

/**
 * @class UserNavigation
 * @desc ログイン状態に応じてナビゲーション項目の出し分け
 */
class UserNavigation {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc APIリクエストに必要なパラメーターを取得して返却する
   */
  getParameter() {
    const callToken = localStorage.getItem(ACCESS_TOKEN)
    return `/user/sessions/${callToken}?time=${new Date().getTime()}`
  }

  /**
   * @desc API実行
   */
  async doAxios() {
    await new AxiosBase().getMethod(this.getParameter(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    // IE11対応用にNodeをArrayに変換
    const convertArray = name => {
      const targetNode = document.querySelectorAll(name)
      const targetArray = Array.prototype.slice.call(targetNode, 0)
      return targetArray
    }

    // ナビを表示させる処理
    const naviShow = className => {
      convertArray(className).forEach(elem => {
        elem.classList.add(ADD_SHOW_CLASS)
      })
    }

    if (status === 200) {
      naviShow(HEADER_LOGIN_NAVI_TARGET)
    }
    if (status.status === 400 || status.status === 401) {
      naviShow(HEADER_LOGOUT_NAVI_TARGET)
    }
  }
}

export default UserNavigation
