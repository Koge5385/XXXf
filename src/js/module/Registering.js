// 定数
const REGISTERING_FLAG = 'entry_mail'
const REGIST_HREF = './create_account.html'

/**
 * @class Registering
 * @desc 会員登録フロー上にいるか判別する処理
 */
class Registering {
  /**
   * @constructor
   */
  constructor() {
    this.isRegistering()
  }

  /**
   * @desc 会員登録フロー上を示すフラグを参照して判別する
   */
  isRegistering() {
    const registeringFlag = localStorage.getItem(REGISTERING_FLAG)
    if (registeringFlag === null) document.location.href = REGIST_HREF
  }
}

export default Registering
