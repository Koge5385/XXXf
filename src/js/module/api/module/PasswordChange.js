import AxiosBase from '../AxiosBase'

/**
 * @class PasswordChange
 * @desc パスワード変更の処理
 */
class PasswordChange {
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
    const currentPassword = document.querySelector('.js-async-currentPassword-target').value
    const newPassword = document.querySelector('.js-async-newPassword-target').value
    const password = JSON.stringify({ "current_password": currentPassword, "new_password": newPassword })
    const id = 1
    console.log(currentPassword)
    console.log(newPassword)
    console.log(password)
    await new AxiosBase().postMethod(`/users/update_password/${id}`, password, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} data コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, data) {
    if (status === 200) {
      console.log(data)
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default PasswordChange
