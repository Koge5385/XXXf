import AxiosBase from '../AxiosBase'
import JsonConvert from './JsonConvert'

// 定数
const ACCESS_TOKEN = 'access_token'
const MYPAGE_HREF = '../mypage/'
const FORM_TARGET_CLASS = '.js-async-editProfileForm-target'
const FORM_MAIL_UPDATE_TARGET = '.js-async-mailUpdate-target'
const PROFILE_UPDATE_MESSAGE = 'プロフィールを更新します。よろしいですか？'
const EMAIL_UPDATE_URL = 'http://develop.medicaloffice-job-hon.pv.bita.jp/dist/mypage/profile_edit.html'

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

    // ユーザーIDの取得API処理
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })

    // 現在のメールアドレス取得処理
    await new AxiosBase().getMethod(`/users/${this.userId}?time=${new Date().getTime()}`, (status, response) => {
      this.currentMail = response.data.user.email
    })

    // 確認ダイアログでOKならアップデート処理をする
    if(confirm) {
      await new AxiosBase().postMethod(`/users/update_candidate/${this.userId}`, sendObject.convertObject(), this.setDataToPage.bind(this))
    }
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      // 変更されたメールアドレスを取得する
      this.updateMail = document.querySelector(FORM_MAIL_UPDATE_TARGET).value

      // メールアドレスに変更があった場合はID更新のAPI処理をする
      if (this.currentMail !== this.updateMail) {
        const sendObject = {'user_id': this.userId, 'email': this.updateMail, 'url': EMAIL_UPDATE_URL}
        const sendData = JSON.stringify(sendObject)
        await new AxiosBase().postMethod('/user/verifies/confirm_email', sendData, (status, response) => {
          document.location.href = MYPAGE_HREF
        })
      }
      if (this.currentMail === this.updateMail) document.location.href = MYPAGE_HREF
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default EditProfile
