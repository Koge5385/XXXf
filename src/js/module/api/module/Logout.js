// 定数
const ACCESS_TOKEN = 'access_token'
const LOGOUT_HREF = '../'
const LOGOUT_MESSAGE = 'ログアウトします。よろしいですか？'

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
   * @desc confirmがtrueならlocalStorageのaccess_tokenを削除してTOPページに移動
   */
  goTop() {
    const confirm = window.confirm(LOGOUT_MESSAGE)
    if(confirm) {
      localStorage.removeItem(ACCESS_TOKEN)
      document.location.href = LOGOUT_HREF
    }
  }
}

export default Logout
