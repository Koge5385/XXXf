import AxiosBase from '../AxiosBase'

// 定数
const ACCESS_TOKEN = 'access_token'
const CURRENT_PASSWORD_TARGET_CLASS = '.js-async-currentPassword-target'
const NEW_PASSWORD_TARGET_CLASS = '.js-async-newPassword-target'
const PASSWORD_CHANGE_HREF = '../'

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
    const currentPassword = document.querySelector(CURRENT_PASSWORD_TARGET_CLASS).value
    const newPassword = document.querySelector(NEW_PASSWORD_TARGET_CLASS).value

    // APIリクエストヘッダーに追加するJSONの作成
    const password = JSON.stringify({ "current_password": currentPassword, "new_password": newPassword })

    // ローカルストレージのアクセストークンをキーにしてユーザーIDを取得する
    const callToken = localStorage.getItem(ACCESS_TOKEN)
    await new AxiosBase().getMethod(`/user/sessions/${callToken}?time=${new Date().getTime()}`,
      (status, response) => this.userId = response.data.user_id
    )
    const id = this.userId

    // パスワード変更のAPIリクエスト
    await new AxiosBase().postMethod(`/users/update_password/${id}`, password, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.location.href = PASSWORD_CHANGE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default PasswordChange
