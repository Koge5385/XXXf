import AxiosBase from '../_Base'

/**
 * @class JobDetail
 * @desc 求人詳細データの呼び出し⇒反映処理
 */
class JobDetail {
  /**
   * @constructor
   */
  constructor() {
    this.getData()
  }

  /**
   * @desc 受け取ったデータの反映
   */
  getData() {
    const baseInstance = new AxiosBase('get', '/jobs/1', '')
    console.log(baseInstance._setBase())
  }
}

export default JobDetail
