import AxiosBase from '../AxiosBase'

// 定数
const CLICK_EVENT = 'click'
const ACCESS_TOKEN = 'access_token'
const DIALOG_TARGET_CLASS = document.querySelector('.js-jobDialog-target')
const DIALOG_COMPLETE_TARGET_CLASS = document.querySelector('.js-jobDialogComplete-target')
const DIALOG_OPEN_TRIGGER_CLASS = document.querySelector('.js-jobDialog-trigger')
const DIALOG_CLOSE_TRIGGER_CLASS = document.querySelectorAll('.js-jobDialogClose-trigger')
const DIALOG_COMPLETE_CLOSE_TRIGGER_CLASS = document.querySelector('.js-jobDialogCompleteClose-trigger')
const APPLY_TRIGGER_CLASS = document.querySelector('.js-jobApply-trigger')

/**
 * @class JobDetailApply
 * @desc 求人応募ボタンクリック時の処理
 */
class JobDetailApply {
  /**
   * @constructor
   */
  constructor() {
    this.getJobId()
    this.getUserAndResumeId()
    this.clickButton()
  }

  /**
   * @desc 求人IDの取得
   */
  getJobId() {
    const params = new URLSearchParams(window.location.search)
    this.applyJobId = params.get('id')
  }

  /**
   * @desc ユーザーIDとレジュメIDの取得
   */
  async getUserAndResumeId() {
    this.token = localStorage.getItem(ACCESS_TOKEN)
    await new AxiosBase().getMethod(`/user/sessions/${this.token}?time=${new Date().getTime()}`, (status, response) => {
      this.applyUserId = response.data.user_id
    })
    await new AxiosBase().getMethod(`/users/${this.applyUserId}?resume=1&time=${new Date().getTime()}`, (status, response) => {
      this.applyResumeId = response.data.user.resume.resume_p_id
    })
  }

  /**
   * @desc 各ボタンクリック時の挙動
   */
  clickButton() {
    DIALOG_OPEN_TRIGGER_CLASS.addEventListener(CLICK_EVENT, () => {
      const noTokenUrl = `../login/?jobId=${this.applyJobId}`
      if(this.token === null) document.location.href = noTokenUrl
      if(this.token !== null) DIALOG_TARGET_CLASS.style.display = 'block'
    })
    Array.prototype.slice.call(DIALOG_CLOSE_TRIGGER_CLASS, 0).forEach(elem => {
      elem.addEventListener(CLICK_EVENT, () => {
        DIALOG_TARGET_CLASS.style.display = 'none'
      })
    })
    DIALOG_COMPLETE_CLOSE_TRIGGER_CLASS.addEventListener(CLICK_EVENT, () => {
      DIALOG_COMPLETE_TARGET_CLASS.style.display = 'none'
    })
    APPLY_TRIGGER_CLASS.addEventListener(CLICK_EVENT, () => {
      this.doAxios()
    })
  }

  /**
   * @desc それぞれのIDを取得し、ボタンクリック時にAPI実行
   */
  async doAxios() {
    const applyData = { 'user_id': Number(this.applyUserId), 'resume_id': Number(this.applyResumeId), 'job_id': Number(this.applyJobId) }
    const sendData = JSON.stringify(applyData)

    new AxiosBase().postMethod('/processes/create', sendData, (status, response) => {
      if (status === 200) {
        DIALOG_TARGET_CLASS.style.display = 'none'
        DIALOG_COMPLETE_TARGET_CLASS.style.display = 'block'
      }
      if (status === 400 || status === 401) {
        console.log('error!')
      }
    })
  }
}

export default JobDetailApply
