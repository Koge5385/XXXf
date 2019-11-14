/**
 * @class MetaReplace
 * @desc metaタグを指定の値に書き換える
 */
class MetaReplace {
  /**
   * @constructor
   * @param {string} title 変更するタイトルの文字列
   * @param {string} description 変更するディスクリプションの文字列
   */
  constructor(title, description) {
    this.titleReplace(title)
    this.descriptionReplace(description)
    this.ogpReplace(title, description)
  }

  /**
   * @desc タイトルタグを変更する
   * @param {string} title 変更するタイトルの文字列
   */
  titleReplace(title) {
    document.title = `${title}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
  }

  /**
   * @desc ページディスクリプションを変更する
   * @param {string} description 変更するディスクリプションの文字列
   */
  descriptionReplace(description) {
    document.getElementsByName('description')[0].content = description
  }

  /**
   * @desc OGP情報を変更する
   * @param {string} title 変更するタイトルの文字列
   * @param {string} description 変更するディスクリプションの文字列
   */
  ogpReplace(title, description) {
    const headTagList = document.head.children
    const current = location.pathname + location.search
    Array.prototype.forEach.call(headTagList, elem => {
      if (elem.getAttribute('property') === 'og:title') elem.content = `${title}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
      if (elem.getAttribute('property') === 'og:description') elem.content = description
      if (elem.getAttribute('property') === 'og:url') elem.content = `https://job.mplat.jp${current}`
    })
  }
}

export default MetaReplace
