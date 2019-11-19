// 定数
const CLICK_EVENT = 'click'
const JOB_CONTACT_TRIGGER_CLASS = document.querySelector('.js-jobContact-trigger')

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
    JOB_CONTACT_TRIGGER_CLASS.addEventListener(CLICK_EVENT, () => {
      const params = new URLSearchParams(window.location.search)
      const jobId = params.get('id')
      document.location.href = `./contact.html?jobId=${jobId}`
    })
  }
}

export default JobDetailContact
