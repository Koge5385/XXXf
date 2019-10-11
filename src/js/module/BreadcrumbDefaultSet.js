const TEXT_TARGET_CLASS = '.js-breadcrumb-target'

/**
 * @class BreadcrumbDefaultSet
 * @desc パンくずリストのスクロール位置を右端にセット
 */
class BreadcrumbDefaultSet {
  /**
   * @constructor
   */
  constructor() {
    this.scrollDefault()
  }

  /**
   * @desc パンくずリストのスクロール位置を右端にセット
   */
  scrollDefault() {
    this.targetElements = document.querySelector(TEXT_TARGET_CLASS)
    this.targetElements.scrollLeft = 10000
  }
}

export default BreadcrumbDefaultSet
