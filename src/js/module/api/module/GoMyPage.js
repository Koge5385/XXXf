import AxiosBase from '../AxiosBase'

// 定数
const ACCESS_TOKEN = 'access_token'
const LOGGEDIN_HREF = '../mypage/'

/**
 * @class GoMyPage
 * @desc ログイン状態のユーザーはマイページに移動
 */
class GoMyPage {
  /**
   * @constructor
   */
  constructor() {
    this.goMyPage()
  }

  /**
   * @desc ログイン状態判別
   */
  async goMyPage() {
    const callToken = localStorage.getItem(ACCESS_TOKEN)
    await new AxiosBase().getMethod(`/user/sessions/${callToken}?time=${new Date().getTime()}`, (status, response) => {
      if (status === 200) document.location.href = LOGGEDIN_HREF
    })
  }
}

export default GoMyPage
