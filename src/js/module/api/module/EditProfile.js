import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const MYPAGE_HREF = '../mypage/'
const FORM_TARGET_CLASS = '.js-async-editProfileForm-target'
const PROFILE_UPDATE_MESSAGE = 'プロフィールを更新します。よろしいですか？'

/**
 * @class EditProfile
 * @desc ユーザープロフィールの更新処理
 */
class EditProfile {
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
    const token = localStorage.getItem(ACCESS_TOKEN)
    const optionObject = { 'token': token }
    const sendObject = new JsonConvert(FORM_TARGET_CLASS, optionObject)
    const confirm = window.confirm(PROFILE_UPDATE_MESSAGE)
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })
    if(confirm) {
      await new AxiosBase().postMethod(`/users/update_candidate/${this.userId}`, sendObject.convertObject(), this.setDataToPage)
    }
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      document.location.href = MYPAGE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default EditProfile
