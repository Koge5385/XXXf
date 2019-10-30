import MobileNavigation from '../module/MobileNavigation'
import AdjustHeightJobCardLine from '../module/AdjustHeightJobCardLine'
import AutoTextOmit from '../module/AutoTextOmit'
import Swiper from '../lib/vendor/swiper/swiper'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const TEXT_WORK_TARGET_CLASS = '.js-adjustHeight-work-target'
const TEXT_TARGET_CLASS = '.js-autoTextOmit-target'
const TEXT_OMIT_SIZE = 23
const TEXT_SWIPER_TARGET_CLASS = '.swiper-container'
const TEXT_SWIPER_OPTION = {
  loop: true,
  loopAdditionalSlides: 10,
  roundLengths: true,
  freeMode: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  breakpoints: {
    768: {
      freeMode: false,
    },
  },
}

window.addEventListener(LOAD_EVENT, () => {
  // SP版ナビゲーションオープン／クローズ時の処理
  new MobileNavigation()

  // jobcardスライダーの定義
  new Swiper(TEXT_SWIPER_TARGET_CLASS, TEXT_SWIPER_OPTION)

  // jobcard内の「見出し」の文字数制限
  new AutoTextOmit(TEXT_TARGET_CLASS, TEXT_OMIT_SIZE)

  // jobcard内の「仕事内容」の高さを揃える
  new AdjustHeightJobCardLine(TEXT_WORK_TARGET_CLASS)
})
