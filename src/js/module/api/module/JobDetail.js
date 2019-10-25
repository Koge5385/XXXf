import AxiosBase from '../AxiosBase'

/**
 * @class JobDetail
 * @desc 求人詳細データの呼び出し⇒反映処理
 */
class JobDetail {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc パラメーターのIDを取得してAPI実行
   */
  async doAxios() {
    const params = new URLSearchParams(window.location.search)
    this.jobId = params.get('id')
    await new AxiosBase().getMethod(`/jobs/${this.jobId}`, this.setDataToPage)
  }

  /**
   * @desc APIの実行
   */
  async setDataToPage(status, data) {
    if (status === 200) {
      const jobData = data.job
      console.log(jobData)
      console.log(Object.keys(jobData))
      Object.keys(jobData).forEach(key => {
        console.log(jobData[key])
        if(key === 'created_at') {
          document.querySelector('.js-jobDetail-date-target').textContent = jobData[key]
        }
      })
    }
  }
}

export default JobDetail
