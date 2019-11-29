import AxiosBase from '../AxiosBase'

// 定数
const CLICK_EVENT = 'click'
const ACCESS_TOKEN = 'access_token'
const DIALOG_TARGET_CLASS = '.js-jobDialog-target'
const DIALOG_COMPLETE_TARGET_CLASS = '.js-jobDialogComplete-target'
const DIALOG_NO_RESUME_ERROR_TARGET_CLASS = '.js-jobDialogNoResumeError-target'
const DIALOG_ALREADY_ERROR_TARGET_CLASS = '.js-jobDialogAlreadyError-target'
const DIALOG_OPEN_TRIGGER_CLASS = '.js-jobDialog-trigger'
const DIALOG_CLOSE_TRIGGER_CLASS = '.js-jobDialogClose-trigger'
const DIALOG_COMPLETE_CLOSE_TRIGGER_CLASS = '.js-jobDialogCompleteClose-trigger'
const DIALOG_NO_RESUME_ERROR_CLOSE_TRIGGER_CLASS = '.js-jobDialogNoResumeErrorClose-trigger'
const DIALOG_ALREADY_ERROR_CLOSE_TRIGGER_CLASS = '.js-jobDialogAlreadyErrorClose-trigger'
const APPLY_TRIGGER_CLASS = '.js-jobApply-trigger'
const RESUME_EDIT_TRIGGER_CLASS = '.js-resumeEdit-trigger'
const RESUME_EDIT_URL = '../mypage/resume_edit.html'

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
      this.errorStatus = status.status
      this.applyUserId = response.data.user_id
    })
    await new AxiosBase().getMethod(`/users/${this.applyUserId}?resume=1&time=${new Date().getTime()}`, (status, response) => {
      this.applyResumeId = response.data.user.resume.id
    })
  }

  /**
   * @desc 各ボタンクリック時の挙動
   */
  clickButton() {
    document.querySelector(DIALOG_OPEN_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      if(this.token === null || this.errorStatus === 400 || this.errorStatus === 401) document.location.href = `../login/?jobId=${this.applyJobId}`
      if(this.token !== null && this.errorStatus !== 400 && this.errorStatus !== 401) JobDetailApply.isShow(DIALOG_TARGET_CLASS, 'show')
    })
    Array.prototype.slice.call(document.querySelectorAll(DIALOG_CLOSE_TRIGGER_CLASS), 0).forEach(elem => {
      elem.addEventListener(CLICK_EVENT, () => {
        JobDetailApply.isShow(DIALOG_TARGET_CLASS, 'hide')
      })
    })
    document.querySelector(DIALOG_COMPLETE_CLOSE_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      JobDetailApply.isShow(DIALOG_COMPLETE_TARGET_CLASS, 'hide')
    })
    document.querySelector(DIALOG_NO_RESUME_ERROR_CLOSE_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      JobDetailApply.isShow(DIALOG_NO_RESUME_ERROR_TARGET_CLASS, 'hide')
    })
    document.querySelector(DIALOG_ALREADY_ERROR_CLOSE_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      JobDetailApply.isShow(DIALOG_ALREADY_ERROR_TARGET_CLASS, 'hide')
    })
    document.querySelector(APPLY_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      if (this.applyResumeId === undefined) {
        JobDetailApply.isShow(DIALOG_NO_RESUME_ERROR_TARGET_CLASS, 'show')
      }
      if (this.applyResumeId !== undefined) {
        document.querySelector(APPLY_TRIGGER_CLASS).style.pointerEvents = "none"
        this.doAxios()
      }
    })
    document.querySelector(RESUME_EDIT_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      document.location.href = RESUME_EDIT_URL
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
        document.querySelector(APPLY_TRIGGER_CLASS).style.pointerEvents = "auto"
        JobDetailApply.isShow(DIALOG_TARGET_CLASS, 'hide')
        JobDetailApply.isShow(DIALOG_COMPLETE_TARGET_CLASS, 'show')
      }
      if (status.status === 400 || status.status === 401) {
        JobDetailApply.isShow(DIALOG_TARGET_CLASS, 'hide')
        JobDetailApply.isShow(DIALOG_ALREADY_ERROR_TARGET_CLASS, 'show')
      }
    })
  }

  /**
   * @desc 表示・非表示操作処理
   * @param {String} className 対象のクラス名
   */
  static isShow(className, status) {
    if (status === 'show') document.querySelector(className).style.display = 'block'
    if (status === 'hide') document.querySelector(className).style.display = 'none'
  }
}

export default JobDetailApply
