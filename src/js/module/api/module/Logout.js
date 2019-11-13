// 定数
const ACCESS_TOKEN = 'access_token'
const LOGOUT_HREF = 'access_token'

/**
 * @class Logout
 * @desc ログアウト時の処理
 */
class Logout {
  /**
   * @constructor
   */
  constructor() {
    this.goTop()
  }

  /**
   * @desc ローカルストレージ上のaccess_tokenを削除してTOPページに移動
   */
  goTop() {
    localStorage.removeItem(ACCESS_TOKEN)
    document.location.href = LOGOUT_HREF
  }
}

export default Logout
