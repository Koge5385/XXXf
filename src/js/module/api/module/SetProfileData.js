import AxiosBase from '../AxiosBase'
import ActivateSubmit from '../../ActivateSubmit'

// 定数
const ACCESS_TOKEN = 'access_token'

/**
 * @class SetProfileData
 * @desc ユーザープロフィールの初期値設定処理
 */
class SetProfileData {
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
    await new AxiosBase().getMethod(`/user/sessions/${token}?time=${new Date().getTime()}`, (status, response) => {
      this.userId = response.data.user_id
    })
    await new AxiosBase().getMethod(`/users/${this.userId}`, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      const userData = response.data.user.hrbc_candidate

      // 登録済みデータの反映処理
      Object.keys(userData).forEach(key => {
        // 画面反映の基本処理
        const setValue = (type, name, value) => document.querySelector(`${type}[name='${name}']`).value = value

        // 選択式のinputは別処理で反映
        const setChoiceValue = (name, value) => {
          const targetNode = document.querySelectorAll(`input[name='${name}']`)
          const targetArray = Array.prototype.slice.call(targetNode, 0)
          targetArray.forEach(elem => {
            if (elem.value === value) elem.checked = true
          })
        }

        switch (key) {
          case 'person_p_name':
            setValue('input', key, userData[key])
            break

          case 'person_p_reading':
            setValue('input', key, userData[key])
            break

          case 'person_u_nenrei':
            setValue('select', 'person_u_nenrei_year', userData[key].slice(0,4))
            setValue('select', 'person_u_nenrei_month', userData[key].slice(5,7))
            setValue('select', 'person_u_nenrei_day', userData[key].slice(8,10))
            break

          case 'person_u_seibetsu':
            setChoiceValue(key, String(Object.keys(userData[key])))
            break

          case 'person_u_zyusyotodoufuken':
            setValue('select', key, String(Object.keys(userData[key])))
            break

          case 'person_u_yubinbangou':
            setValue('input', key, userData[key])
            break

          case 'person_u_zyusyosyousai':
            setValue('input', key, userData[key])
            break

          case 'person_p_telephone':
            setValue('input', key, userData[key])
            break

          case 'person_p_mail':
            setValue('input', key, userData[key])
            break

          default:
            break
        }
      })

      // submitボタンの活性化処理
      new ActivateSubmit()
    }
    if (status.status === 400 || status.status === 401) {
      console.log('error')
    }
  }
}

export default SetProfileData
