import AxiosBase from '../AxiosBase'
import DataReflect from './DataReflect'

/**
 * @class JobDetail
 * @desc 求人詳細データの呼び出し⇒反映処理
 */
class JobDetail {
  /**
   * @constructor
   */
  constructor() {
    this.doAxios()
  }

  /**
   * @desc パラメーターのIDを取得してAPI実行
   */
  async doAxios() {
    const params = new URLSearchParams(window.location.search)
    this.jobId = params.get('id')
    await new AxiosBase().getMethod(`/jobs/${this.jobId}`, this.setDataToPage)
  }

  /**
   * @desc APIの実行
   * @param {Number} status コールバックで返却されたステータスコード
   * @param {Object} data コールバックで返却されたデータオブジェクト
   */
  async setDataToPage(status, data) {
    if (status === 200) {
      const jobData = data.data.job
      const createElement = new DataReflect()
      const pageName = 'jobDetail'
      Object.keys(jobData).forEach(key => {

        // APIからの返却データをそのまま反映
        createElement.reflect(key, 'job_p_position', `${pageName}Category`, jobData[key])
        createElement.reflect(key, 'job_p_phasedate', `${pageName}Date`, jobData[key])
        createElement.reflect(key, 'job_u_kyuujinnnoosusumepointo', `${pageName}Title`, jobData[key])
        createElement.reflect(key, 'job_p_publish', `${pageName}BuildingName`, jobData['job_p_publish'].option_p_nondisclosure.option_p_name)
        createElement.reflect(key, 'job_p_job_category', `${pageName}Occupation`, jobData['job_p_job_category'].option_u_010895.option_p_name)
        createElement.reflect(key, 'job_p_area', `${pageName}Place`, jobData[key])
        createElement.reflect(key, 'job_p_job_category_summary', `${pageName}Sumally`, jobData[key])
        createElement.reflect(key, 'job_p_employment_type', `${pageName}Position`, jobData['job_p_employment_type'].option_p_fullTime.option_p_name)
        createElement.reflect(key, 'job_p_woking_hours', `${pageName}WorkTime`, jobData[key])
        createElement.reflect(key, 'job_p_holidays', `${pageName}Holiday`, jobData[key])
        createElement.reflect(key, 'job_u_shiyoukikannoumu', `${pageName}Overtime`, jobData[key])
        createElement.reflect(key, 'job_u_siyoukikanshousai', `${pageName}Trial`, jobData[key])
        createElement.reflect(key, 'job_p_benefits', `${pageName}Benefit`, jobData[key])
        createElement.reflect(key, 'job_u_sonotabikou', `${pageName}Other`, jobData[key])

        // パンくずリストにタイトルを反映
        createElement.reflect(key, 'job_u_kyuujinnnoosusumepointo', 'breadcrumbText', jobData[key])

        // 年収のみ「万円」の単位に変換する処理を追加
        createElement.reflect(key, 'job_p_max_salary', `${pageName}MaxSalary`, Number(String(jobData[key]).slice(0, -4)).toLocaleString().replace(/\r?\n/g, '<br>'))
        createElement.reflect(key, 'job_p_min_salary', `${pageName}MinSalary`, Number(String(jobData[key]).slice(0, -4)).toLocaleString().replace(/\r?\n/g, '<br>'))
      })
    }
    if (status === 400 || status === 401) {
      document.querySelector('.js-success-target').style.display = 'none'
      document.querySelector('.js-error-target').style.display = 'block'
    }
  }
}

export default JobDetail
