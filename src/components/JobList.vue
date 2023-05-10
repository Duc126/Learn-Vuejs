<style>
  @import "/JobList.css";
</style>
<template>
  <div class="container">
    <div>
      <div class="d-flex">
      <h3>Filter by category:</h3>
      <div class="d-flex" style="padding-left: 60px; padding-top: 6px;">
        <div style="padding: 0 15px;" v-for="category in filterCategory" :key="category">
        <input type="checkbox" :id="'category-'+category" :value="category" v-model="selectedCategories" @change="filterJobs">
        <label :for="'category-'+category">{{ category }}</label>
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
          <img :src="require(`@/assets/img/${job.img_job}`)" :alt="job.name_job" width="150" height="150" style="display: block; margin: auto;">
          <h5 class="text-center mt-2">{{ job.name_job }}</h5>
          <p class="job-description px-4" v-if="job.sum_job" v-html="job.sum_job.replace(/\n/g, '<br><br>')"></p>
          <router-link :to="'/job-detail/' + job.id" style="color: #d90429; text-decoration: none; padding: 0px 20px;">XEM CHI TIẾT</router-link>
        </div>
      </div>
    </div>
  </div></template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      jobs: 'jobs',
      filterCategory: 'filterCategory',
      filteredJobs: 'filteredJobs'
    }),
    selectedCategories: {
      get () {
        return this.$store.getters.selectedCategories
      },
      set (value) {
        this.$store.commit('setSelectedCategories', value)
      }
    }
  },
  created () {
    this.$store.dispatch('fetchJobs')
  },
  methods: {
    filterJobs () {
      if (this.selectedCategories.includes('default')) {
        return
      }
      this.$store.dispatch('setCategories', this.selectedCategories)
    }
  }
}

</script>
