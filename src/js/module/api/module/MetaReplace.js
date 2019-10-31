/**
 * @class MetaReplace
 * @desc metaタグを指定の値に書き換える
 */
class MetaReplace {
  /**
   * @desc タイトルタグを変更する
   * @param {string} title 入れ込みたいタイトルの文字列
   */
  static titleReplace(title) {
    document.title = `${title}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
  }

  /**
   * @desc ページディスクリプションを変更する
   * @param {string} description 入れ込みたいディスクリプションの文字列
   */
  static descriptionReplace(description) {
    document.getElementsByName('description')[0].content = description
  }

  /**
   * @desc OGP情報を変更する
   * @param {string} ogTitle 入れ込みたいOGPタイトルの文字列
   * @param {string} ogDescription 入れ込みたいOGPディスクリプションの文字列
   */
  static ogpReplace(ogTitle, ogDescription) {
    const headTagList = document.head.children
    const current = location.pathname + location.search
    Array.prototype.forEach.call(headTagList, elem => {
      if (elem.getAttribute('property') === 'og:title') elem.content = `${ogTitle}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
      if (elem.getAttribute('property') === 'og:description') elem.content = ogDescription
      if (elem.getAttribute('property') === 'og:url') elem.content = `https://job.mplat.jp${current}`
    })
  }
}

export default MetaReplace
