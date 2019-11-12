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
    localStorage.removeItem('access_token')
    document.location.href = '../'
  }
}

export default Logout
