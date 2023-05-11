<style>
  @import "/JobList.css";
</style>
<template>
  <div class="container">

    <div>
      <div class="d-flex">
      <h3>{{ $t('filter.filter')}}</h3>
      <div class="d-flex" style="padding-left: 60px; padding-top: 6px;">
        <div :class="{'d-none': !category}" style="padding: 0 15px;" v-for="category in filterCategory" :key="category">
        <input type="checkbox" :id="'category-'+category" :value="category" v-model="selectedCategories" @change="filterJobs">
        <label :for="'category-'+category">{{ category }}</label>
      </div>

    </div>
    </div>

    <div>
      <div>
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
    <b-button variant="primary mb-3" v-b-modal.modal-add-job>
      {{ $t('add.job')}}
    </b-button>

    <b-modal id="modal-add-job" title="Add Job"  hide-footer>
      <b-form-input hidden v-model="newJob.id"></b-form-input>
      <b-form-group label="Email">
        <b-form-input
          v-model="newJob.email"
          v-validate="'required|email'"
          data-vv-validate-on="input"
          name="email"
          type="text"
        ></b-form-input>
        <span class="text-danger">{{ errorMessage }}</span>
      </b-form-group>
      <b-form-group label="Tên công việc">
        <b-form-input v-model="newJob.name_job"></b-form-input>
      </b-form-group>
      <b-form-group label="Danh Mục">
        <b-form-input v-model="newJob.category"></b-form-input>
      </b-form-group>
      <b-form-group label="Mô tả">
        <b-form-textarea v-model="newJob.sum_job"></b-form-textarea>
      </b-form-group>

      <b-button type="button" variant="secondary" class="mt-3" @click="onCloseModal">
        Close
      </b-button>
      <b-button type="button" variant="primary" class="mt-3" @click="onAddJob">
        Save
      </b-button>
    </b-modal>
  </div>
    </div>
    <div>
</div>
    </div>
    <div class="d-flex flex-wrap">
      <div v-for="(job, index) in filteredJobs" :key="job.name_job" :style="{ 'margin-right': index % 4 !== 3 ? '25px' : 0 }">
        <div class="job-item p-2" >
          <div class="jobID">
            <h5 style="margin-left: 10px;">{{ job.id }}</h5>
          </div>

          <img :src="job.img_job ? require(`@/assets/img/${job.img_job}`) : ''" :alt="job.name_job" width="150" height="150" style="display: block; margin: auto;">
          <h5 class="text-center mt-2">{{ job.name_job }}</h5>
          <strong class="text-center mt-2">{{ job.email }}</strong>
          <p class="job-description px-4" v-if="job.sum_job" v-html="job.sum_job.replace(/\n/g, '<br><br>')"></p>
          <router-link :to="'/job-detail/' + job.id" style="color: #d90429; text-decoration: none; padding: 0px 20px;">XEM CHI TIẾT</router-link>
          <button class="btn btn-danger" @click="onDeleteJob(job.id)">Delete</button>

        </div>
      </div>
    </div>
  </div>

  </template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { addJob, deleteJob } from '@/services/JobService.js'
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
    ...mapActions(['fetchJobs']),
    async onAddJob () {
      this.errorMessage = null
      this.$validator.validateAll()
        .then(async result => {
          if (result) {
            const addedJob = await addJob(this.newJob)
            await this.fetchJobs()
            this.$store.commit('addJob', addedJob)
            this.newJob = {
              id: '',
              email: '',
              name_job: '',
              sum_job: ''
            }
            this.successMessage = this.$t('message.add-success')
            this.$bvModal.hide('modal-add-job')
          } else {
            this.errorMessage = this.errors.first('email')
          }
        })
    },
    onCloseModal () {
      this.$bvModal.hide('modal-add-job')
    },
    async onDeleteJob (id) {
      await deleteJob(id)
      await this.fetchJobs()
      this.successMessage = this.$t('message.delete-success')
    },

    filterJobs () {
      if (this.selectedCategories.includes('default')) {
        return
      }
      this.$store.dispatch('setCategories', this.selectedCategories)
    }
  },
  data () {
    return {
      newJob: {
        id: '',
        email: '',
        name_job: '',
        sum_job: ''
      },
      successMessage: null,
      errorMessage: null
    }
  }
}

</script>
