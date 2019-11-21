import AxiosBase from '../AxiosBase'
import ActivateSubmit from '../../ActivateSubmit'

/**
 * @class CreateAccount
 * @desc 会員登録->メールアドレス登録時の処理
 */
class CreateAccount {
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
    new ActivateSubmit()
    await new AxiosBase().postMethod('/user/sessions/login', sendObject.convertObject(), this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      console.log('success')
    }
    if (status === 400 || status === 401) {
      console.log('error')
    }
  }
}

export default CreateAccount
