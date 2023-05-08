<style>
  @import "/JobList.css";
</style>
<template>
  <div class="container">
    <div>
      <div class="d-flex">
      <h3>Filter by category:</h3>
      <div class="d-flex" style="padding-left: 60px; padding-top: 6px;">
        <div v-for="category in categories" :key="category.id" style="position: relative; padding: 0 15px;">
        <input type="checkbox" :id="'category-'+category.id" :value="category.name" v-model="selectedCategories" @change="filterJobs">
        <label :for="'category-'+category.id">{{ category.name }}</label>
      </div>
    </div>
    </div>

    </div>
    <div class="d-flex">
      <div v-for="job in filteredJobs" :key="job.name_job" style="position: relative; padding: 0 15px;">
        <div class="job-item p-2" >
          <div class="jobID">
            <h5 style="margin-left: 10px;">{{ job.id }}</h5>
          </div>
          <img :src="job.img_job" :alt="job.name_job" width="150" height="150" style="display: block; margin: auto;">
          <h5 class="text-center mt-2">{{ job.name_job }}</h5>
          <p class="job-description px-4" v-if="job.sum_job" v-html="job.sum_job.replace(/\n/g, '<br><br>')"></p>
          <router-link :to="'/job-detail/' + job.id" style="color: #d90429; text-decoration: none; padding: 0px 20px;">XEM CHI TIẾT</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JobList',
  data () {
    return {
      jobs: [
        {
          id: 1,
          img_job: require('@/assets/img/pic1.png'),
          name_job: 'Lập trình viên Front-End',
          sum_job: `
                • Biết sử dụng phần mềm thiết kế Figma, sketch là lợi thế,
                • Có khả năng lập trình HTML5, CSS3, Javascript, Jquery.
            `,
          link_detail_job: 'job_detail_1.html',
          category: 'php'
        },
        {
          id: 2,
          img_job: require('@/assets/img/pic2.png'),
          name_job: 'Product Designer',
          sum_job: `
                • Thiết kế giao diện và trải nghiệm người dùng ứng dụng trên nền tảng web, mobile và native app.
                • Tham gia và phối hợp trong việc phát triển ý tưởng tổng quan và thiết kế cho tính năng sản phẩm mới
            `,
          link_detail_job: 'job_detail_2.html',
          category: 'Front-End'

        },
        {
          id: 3,
          img_job: require('@/assets/img/pic3.png'),
          name_job: 'PHP Dev 1',
          sum_job: `
                Tham gia vào tất cả các giai đoạn của quy trình phát triển ứng dụng PHP bao gồm giai đoạn Thiết kế, Phân tích, Phát triển và Bảo trì.
            `,
          link_detail_job: 'job_detail_3.html',
          category: 'Designer'

        },
        {
          id: 4,
          img_job: require('@/assets/img/pic4.png'),
          name_job: 'PHP Dev',
          sum_job: `
                Tham gia vào tất cả các giai đoạn của quy trình phát triển ứng dụng PHP bao gồm giai đoạn Thiết kế, Phân tích, Phát triển và Bảo trì.
            `,
          link_detail_job: 'job_detail_3.html',
          category: 'Designer'

        }

      ],
      selectedCategories: [],
      categories: []
    }
  },

  computed: {
    filteredJobs: function () {
      if (this.selectedCategories.length === 0) {
        return this.jobs
      } else {
        return this.jobs.filter(job => this.selectedCategories.includes(job.category))
      }
    }
  },
  methods: {
    filterJobs () {
      // update jobs based on selected categories
      this.filteredJobs = this.jobs.filter(job => {
        return this.selectedCategories.includes(job.category)
      })
    }

  },

  mounted () {
    // extract categories from jobsData
    const categorySet = new Set(this.jobs.map(job => job.category))
    console.log(categorySet)
    this.categories = Array.from(categorySet).map((category, index) => ({ id: index + 1, name: category }))
  }
}

</script>
