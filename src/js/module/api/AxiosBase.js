import axios from 'axios'

/**
 * @param {String} method get または post
 * @param {String} url 対象のURLパラメーター
 * @param {String} options 呼び出し時のオプション設定
 */

export function getAxiosBase(url, options) {
  const api = axios.create({
    baseURL: 'http://54.168.137.34:3001/v1',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
  })
  const params = { timeout: 5000, options }

  api.get(url, params)
    .then(response => {
      console.log(response.data)
      response.data
    })
    .catch(error => error)
}
