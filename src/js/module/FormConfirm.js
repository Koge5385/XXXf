// 定数
const CLICK_EVENT = 'click'
const FORM_CONFIRM_TRIGGER = '.js-confirm-trigger'
const FORM_CONFIRM_BACK_TRIGGER = '.js-confirmBack-trigger'
const FORM_SUBMIT_TARGET = '.js-submit-target'
const OTHER_HIDE_TARGET = '.js-confirmHide-target'
const ADD_SHOW_CLASS = 'is-show'
const ADD_HIDE_CLASS = 'is-hide'

/**
 * @class FormConfirm
 * @desc フォームの確認画面処理
 */
class FormConfirm {
  /**
   * @constructor
   */
  constructor() {
    this.formConfirm()
  }

  /**
   * @desc パンくずリストのスクロール位置を右端にセット
   */
  formConfirm() {
    const targetForm = document.querySelector('form')

    // IE11対応用にNodeをArrayに変換
    const convertArray = elem => {
      const targetNode = targetForm.querySelectorAll(elem)
      const targetArray = Array.prototype.slice.call(targetNode, 0)
      return targetArray
    }

    // 表示・非表示処理
    const showElement = elem => {
      const targetElement = targetForm.querySelector(elem)
      targetElement.classList.add(ADD_SHOW_CLASS)
      targetElement.classList.remove(ADD_HIDE_CLASS)
    }
    const hideElement = elem => {
      const targetElement = targetForm.querySelector(elem)
      targetElement.classList.add(ADD_HIDE_CLASS)
      targetElement.classList.remove(ADD_SHOW_CLASS)
    }

    // 対象フォーム内の要素をreadonlyにする処理
    const readonlyAdd = toggle => {
      if (toggle === 'show') {
        convertArray('input[type="text"]').forEach(elem => {
          const value = elem.value
          elem.classList.add(ADD_HIDE_CLASS)
          elem.nextElementSibling.innerHTML = value
          elem.nextElementSibling.classList.add(ADD_SHOW_CLASS)
        })
        convertArray('input[type="password"]').forEach(elem => {
          const repeat = elem.value.length + 1
          elem.classList.add(ADD_HIDE_CLASS)
          elem.nextElementSibling.innerHTML = Array(repeat).join('●')
          elem.nextElementSibling.classList.add(ADD_SHOW_CLASS)
        })
        convertArray('textarea').forEach(elem => {
          const value = elem.value.replace(/\r?\n/g, '<br>')
          elem.classList.add(ADD_HIDE_CLASS)
          elem.nextElementSibling.innerHTML = value
          elem.nextElementSibling.classList.add(ADD_SHOW_CLASS)
        })
        convertArray('select').forEach(elem => {
          const index = elem.selectedIndex
          const text = elem.options[index].text
          elem.classList.add(ADD_HIDE_CLASS)
          if (elem.value !== '') elem.nextElementSibling.innerHTML = text
          elem.nextElementSibling.classList.add(ADD_SHOW_CLASS)
        })
        convertArray('input[type="radio"]').forEach(elem => {
          const parent = elem.parentNode
          const label = elem.nextElementSibling
          const labelText = label.textContent
          label.classList.add(ADD_HIDE_CLASS)
          if (elem.checked) {
            parent.nextElementSibling.innerHTML = labelText
            parent.nextElementSibling.classList.add(ADD_SHOW_CLASS)
          }
        })
        convertArray('input[type="checkbox"]').forEach(elem => {
          const parent = elem.parentNode
          const label = elem.nextElementSibling
          const labelText = label.textContent
          label.classList.add(ADD_HIDE_CLASS)
          if (elem.checked) {
            parent.nextElementSibling.innerHTML = labelText
            parent.nextElementSibling.classList.add(ADD_SHOW_CLASS)
          }
        })
        convertArray(OTHER_HIDE_TARGET).forEach(elem => {
          elem.style.display = 'none'
        })
      }
      if (toggle === 'hide') {
        convertArray('input[type="text"]').forEach(elem => {
          elem.classList.remove(ADD_HIDE_CLASS)
          elem.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
        })
        convertArray('input[type="password"]').forEach(elem => {
          elem.classList.remove(ADD_HIDE_CLASS)
          elem.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
        })
        convertArray('textarea').forEach(elem => {
          elem.classList.remove(ADD_HIDE_CLASS)
          elem.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
        })
        convertArray('select').forEach(elem => {
          elem.classList.remove(ADD_HIDE_CLASS)
          elem.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
        })
        convertArray('input[type="radio"]').forEach(elem => {
          const parent = elem.parentNode
          const label = elem.nextElementSibling
          label.classList.remove(ADD_HIDE_CLASS)
          if (elem.checked) {
            parent.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
          }
        })
        convertArray('input[type="checkbox"]').forEach(elem => {
          const parent = elem.parentNode
          const label = elem.nextElementSibling
          label.classList.remove(ADD_HIDE_CLASS)
          if (elem.checked) {
            parent.nextElementSibling.classList.remove(ADD_SHOW_CLASS)
          }
        })
        convertArray(OTHER_HIDE_TARGET).forEach(elem => {
          elem.style.display = 'block'
        })
      }
    }

    document.querySelector(FORM_CONFIRM_TRIGGER).addEventListener(CLICK_EVENT, () => {
      readonlyAdd('show')
      hideElement(FORM_CONFIRM_TRIGGER)
      showElement(FORM_CONFIRM_BACK_TRIGGER)
      showElement(FORM_SUBMIT_TARGET)
      window.scrollTo(0,0)
    })

    document.querySelector(FORM_CONFIRM_BACK_TRIGGER).addEventListener(CLICK_EVENT, () => {
      readonlyAdd('hide')
      showElement(FORM_CONFIRM_TRIGGER)
      hideElement(FORM_CONFIRM_BACK_TRIGGER)
      hideElement(FORM_SUBMIT_TARGET)
    })
  }
}

export default FormConfirm
