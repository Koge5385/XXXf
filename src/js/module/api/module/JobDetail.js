import AxiosBase from '../AxiosBase'

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
   */
  async setDataToPage(status, data) {
    if (status === 200) {
      const jobData = data.data.job
      console.log(jobData)
      Object.keys(jobData).forEach(key => {
        if (key === 'job_p_position') {
          document.querySelector('.js-jobDetail-category-target').textContent = jobData[key]
          console.log(jobData[key])
        }
        if (key === 'job_p_phasedate') {
          document.querySelector('.js-jobDetail-date-target').textContent = jobData[key]
        }
        if (key === 'job_u_kyuujinnnoosusumepointo') {
          document.querySelector('.js-jobDetail-title-target').textContent = jobData[key]
        }
        if (key === 'job_p_publish') {
          document.querySelector('.js-jobDetail-buildingName-target').textContent = jobData[key].option_p_nondisclosure.option_p_name
        }
        if (key === 'job_p_job_category') {
          document.querySelector('.js-jobDetail-occupation-target').textContent = jobData[key].option_u_010895.option_p_name
        }
        if (key === 'job_p_area') {
          document.querySelector('.js-jobDetail-place-target').textContent = jobData[key]
        }
        if (key === 'job_p_max_salary') {
          console.log(jobData[key])
          const convert = String(jobData[key]).slice(0, -4)
          document.querySelector('.js-jobDetail-maxSalary-target').textContent = Number(convert).toLocaleString()
        }
        if (key === 'job_p_min_salary') {
          const convert = String(jobData[key]).slice(0, -4)
          document.querySelector('.js-jobDetail-minSalary-target').textContent = Number(convert).toLocaleString()
        }
        if (key === 'job_p_job_category_summary') {
          document.querySelector('.js-jobDetail-sumally-target').textContent = jobData[key]
        }
        if (key === 'job_p_employment_type') {
          document.querySelector('.js-jobDetail-position-target').textContent = jobData[key].option_p_fullTime.option_p_name
        }
        if (key === 'job_p_woking_hours') {
          document.querySelector('.js-jobDetail-workTime-target').textContent = jobData[key]
        }
        if (key === 'job_p_holidays') {
          document.querySelector('.js-jobDetail-holiday-target').textContent = jobData[key]
        }
        if (key === 'job_u_shiyoukikannoumu') {
          document.querySelector('.js-jobDetail-overtime-target').textContent = jobData[key]
        }
        if (key === 'job_u_siyoukikanshousai') {
          document.querySelector('.js-jobDetail-trial-target').textContent = jobData[key]
        }
        if (key === 'job_p_benefits') {
          document.querySelector('.js-jobDetail-benefit-target').textContent = jobData[key]
        }
        if (key === 'job_u_sonotabikou') {
          document.querySelector('.js-jobDetail-other-target').textContent = jobData[key]
        }
      })
    }
  }
}

export default JobDetail
