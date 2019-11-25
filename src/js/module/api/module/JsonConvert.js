/**
 * @class JsonConvert
 * @desc 対象のフォームデータを取得してJSONを返す
 */
class JsonConvert {
  /**
   * @constructor
   * @param {string} targetFormClass 対象フォームのクラス名
   */
  constructor(targetFormClass, optionObject) {
    this.targetFormClass = targetFormClass
    this.optionObject = optionObject
  }

  /**
   * @desc FormDataのオブジェクトをJSONに変換・返却する
   */
  convertObject() {
    const jsonObject = {}
    const formData = new FormData(document.querySelector(this.targetFormClass))
    formData.forEach((value, key) => {
      switch (key) {
        case 'person_u_nenrei_year':
          jsonObject['person_u_nenrei'] = value
          break

        case 'person_u_nenrei_month':
          jsonObject['person_u_nenrei'] += `/${value}`
          break

        case 'person_u_nenrei_day':
          jsonObject['person_u_nenrei'] += `/${value}`
          break

        case 'resume_p_experienced_industry':
          jsonObject[key] === undefined
            ? jsonObject[key] = `${value},`
            : jsonObject[key] += `${value},`
          break

        case 'resume_p_experienced_job_category':
            jsonObject[key] === undefined
              ? jsonObject[key] = `${value},`
              : jsonObject[key] += `${value},`
          break

        case 'resume_p_expect_employment_type':
            jsonObject[key] === undefined
              ? jsonObject[key] = `${value},`
              : jsonObject[key] += `${value},`
          break

        case 'resume_p_expect_job_category':
            jsonObject[key] === undefined
              ? jsonObject[key] = `${value},`
              : jsonObject[key] += `${value},`
          break

        case 'resume_p_carrier_summary_2':
          jsonObject['resume_p_carrier_summary'] += `\r\n\r\n${value},`
          break

        case 'resume_p_carrier_summary_3':
          jsonObject['resume_p_carrier_summary'] += `\r\n\r\n${value},`
          break

        default:
          jsonObject[key] = value
          break
      }
    })
    Object.assign(jsonObject, this.optionObject)
    const convertData = JSON.stringify(jsonObject)
    return convertData
  }
}

export default JsonConvert
