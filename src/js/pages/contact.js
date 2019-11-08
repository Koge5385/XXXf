import ValueEmptyCheck from '../module/ValueEmptyCheck'
import HasChecked from '../module/HasChecked'
import MailAddressValidation from '../module/MailAddressValidation'

// 定数
const LOAD_EVENT = 'DOMContentLoaded'

console.log(new ValueEmptyCheck().isValueEmpty())

window.addEventListener(LOAD_EVENT, () => {
  new ValueEmptyCheck()
  new HasChecked()
  new MailAddressValidation()
})
