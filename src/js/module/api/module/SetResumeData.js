import AxiosBase from '../AxiosBase'
import ActivateSubmit from '../../ActivateSubmit'
import RegistResume from './RegistResume'

// 定数
const ACCESS_TOKEN = 'access_token'
const CLICK_EVENT = 'click'
const FORM_SUBMIT_TARGET_CLASS = '.js-async-editResumeSubmit-target'

/**
 * @class SetResumeData
 * @desc レジュメの初期値設定処理
 */
class SetResumeData {
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
      this.resumeId = response.data.resume_id
    })
    await new AxiosBase().getMethod(`/resumes/${this.resumeId}`, this.setDataToPage)
  }

  /**
   * @desc 画面反映処理
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} response コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, response) {
    if (status === 200) {
      const resumeData = response.data.resume.hrbc_resume
      document.querySelector('.editResume').classList.add('fadeInBox')

      // 登録済みデータの反映処理
      Object.keys(resumeData).forEach(key => {
        // 画面反映の基本処理
        const setValue = (type, name, value) => {
          document.querySelector(`${type}[name='${name}']`).value = value
        }

        // 選択式のinputは別処理で反映
        const setChoiceValue = (name, value) => {
          const targetNode = document.querySelectorAll(`input[name='${name}']`)
          const targetArray = Array.prototype.slice.call(targetNode, 0)
          targetArray.forEach(elem => {
            if (elem.value === value) elem.checked = true
          })
        }

        switch (key) {
          case 'resume_u_saisyugakureki':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break

          case 'resume_p_education':
            setValue('textarea', key, resumeData[key])
            break

          case 'resume_u_hoyuushikakusukiru':
            setValue('textarea', key, resumeData[key])
            break

          case 'resume_p_current_status':
            setChoiceValue(key, String(Object.keys(resumeData[key])))
            break

          case 'resume_u_tenshokukaisuu':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break

          case 'resume_u_tenshokuriyuu':
            setValue('textarea', key, resumeData[key])
            break

          case 'resume_p_carrier_summary':
            const separateData = resumeData[key].split(/\n\n/)
            if(separateData[0]) {
              setValue('textarea', 'resume_p_carrier_summary', separateData[0])
              setValue('textarea', 'resume_p_carrier_summary_2', separateData[1].slice(0, -1))
              if (separateData[2]) {
                const restData = separateData.slice(2)
                const rest = restData.join('\n\n').slice(0, -1)
                setValue('textarea', 'resume_p_carrier_summary_3', rest)
              }
            }
            break

          case 'resume_p_current_salary':
            setValue('input', key, resumeData[key])
            break

          case 'resume_u_kibounenshuu':
            setValue('input', key, resumeData[key])
            break

          case 'resume_u_moyorieki':
            setValue('input', key, resumeData[key])
            break

          case 'resume_u_genzainokinmusaki':
            setValue('input', key, resumeData[key])
            break

          case 'resume_p_expect_area':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break
          
          case 'resume_u_kiboukinmuchi2':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break

          case 'resume_u_kiboukinmuchi3':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break

          case 'resume_u_kiboukinmutisyousai':
            setValue('input', key, resumeData[key])
            break

          case 'resume_p_experienced_industry':
            String(Object.keys(resumeData[key])).split(',').forEach(name => setChoiceValue(key, name))
            break

          case 'resume_p_experienced_job_category':
            String(Object.keys(resumeData[key])).split(',').forEach(name => setChoiceValue(key, name))
            break

          case 'resume_p_expect_employment_type':
            String(Object.keys(resumeData[key])).split(',').forEach(name => setChoiceValue(key, name))
            break

          case 'resume_p_expect_job_category':
            String(Object.keys(resumeData[key])).split(',').forEach(name => setChoiceValue(key, name))
            break

          case 'resume_p_expect_condition':
            setValue('textarea', key, resumeData[key])
            break

          case 'resume_u_tenshokunitaisuruiyoku':
            setValue('select', key, String(Object.keys(resumeData[key])))
            break

          case 'resume_u_jikopr':
            setValue('textarea', key, resumeData[key])
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

  /**
   * @desc 【例外処理】レジュメ登録を無視したユーザーの処理
   */
  createResume() {
    // submitボタンの活性化処理
    new ActivateSubmit()

    document.querySelector(FORM_SUBMIT_TARGET_CLASS).addEventListener(CLICK_EVENT, () => {
      // レジュメ登録時のAPI処理
      new RegistResume()
    })
  }
}

export default SetResumeData
