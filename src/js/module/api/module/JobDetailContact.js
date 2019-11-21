// 定数
const CLICK_EVENT = 'click'
const JOB_CONTACT_TRIGGER_CLASS = '.js-jobContact-trigger'

/**
 * @class JobDetailContact
 * @desc 求人問い合わせボタンクリック時の処理
 */
class JobDetailContact {
  /**
   * @constructor
   */
  constructor() {
    this.goJobContact()
  }

  /**
   * @desc 求人IDをパラメーターに渡してページ移動させる
   */
  goJobContact() {
    const params = new URLSearchParams(window.location.search)
    const jobId = params.get('id')
    document.querySelector(JOB_CONTACT_TRIGGER_CLASS).addEventListener(CLICK_EVENT, () => {
      document.location.href = `./contact.html?jobId=${jobId}`
    })
  }
}

export default JobDetailContact
