/**
 * @class MetaReplace
 * @desc metaタグを指定の値に書き換える
 */
class MetaReplace {
  /**
   * @constructor
   * @param {string} title 入れ込みたいタイトルの文字列
   * @param {string} description 入れ込みたいディスクリプションの文字列
   */
  constructor(title, description) {
    this.title = title
    this.description = description
  }

  /**
   * @desc タイトルタグを変更する
   */
  titleReplace() {
    document.title = `${this.title}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
  }

  /**
   * @desc ページディスクリプションを変更する
   */
  descriptionReplace() {
    document.getElementsByName('description')[0].content = this.description
  }

  /**
   * @desc OGP情報を変更する
   */
  ogpReplace() {
    const headTagList = document.head.children
    const current = location.pathname + location.search
    Array.prototype.forEach.call(headTagList, elem => {
      if (elem.getAttribute('property') === 'og:title') elem.content = `${this.title}｜医療事務職の求人サービスなら【M.PLAT 求職支援】`
      if (elem.getAttribute('property') === 'og:description') elem.content = this.description
      if (elem.getAttribute('property') === 'og:url') elem.content = `https://job.mplat.jp${current}`
    })
  }
}

export default MetaReplace
