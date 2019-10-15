import AxiosBase from '../module/AxiosBase'
import MobileNavigation from '../module/MobileNavigation'
import AdjustHeightJobCardLine from '../module/AdjustHeightJobCardLine'
import Swiper from '../lib/vendor/swiper/swiper'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'
const TEXT_WORK_TARGET_CLASS = '.js-adjustHeight-work-target'
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

  // jobcard内「見出し」と「仕事内容」の高さを揃える
  new AdjustHeightJobCardLine(TEXT_WORK_TARGET_CLASS)

  // API連携テスト
  new AxiosBase()
})
