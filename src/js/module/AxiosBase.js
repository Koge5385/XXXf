import baseAPI from 'axios'

/**
 * @class AxiosBase
 * @desc API連携のベースファイル
 */
class AxiosBase {
  /**
   * @constructor
   */
  constructor() {
    this.getMethod()
  }

  /**
   * @desc APIのGET処理
   */
  getMethod() {
    const axios = baseAPI.create({
      baseURL: 'http://54.168.137.34:3001/v1',
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
    axios.get('/jobs/1').then(res => {
      console.log(res.data.job)
    }).catch(error => {
      console.log(error)
    })
  }
}

export default AxiosBase
