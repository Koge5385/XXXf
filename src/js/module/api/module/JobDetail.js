import { getAxiosBase } from '../AxiosBase'

/**
 * @class JobDetail
 * @desc 求人詳細データの呼び出し⇒反映処理
 */
class JobDetail {
  /**
   * @constructor
   */
  constructor() {
    this.axios = new getAxiosBase('/jobs/1', '')
    console.log(this.axios)
    this.getData()
  }

  /**
   * @desc 受け取ったデータの反映
   */
  getData() {
    const getData = this.axios
    console.log(getData)
  }
}

export default JobDetail
