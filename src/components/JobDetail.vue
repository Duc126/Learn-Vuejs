<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6 w-50" style=" height: 250px;">
        <!-- <img :src="require(`@/assets/img/${job.img_job}`)" :alt="job.name_job" width="250" height="200" class="img-fluid"> -->
        <img
            :src="job.img_job ? require(`@/assets/img/${job.img_job}`) : ''"
            :alt="job.name_job"
            width="250"
            height="200"
            style="display: block; margin: auto;">
          </div>
      <div class="col-md-6">
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label class="float-left" for="name_job">{{ $t('detail.name')}}:</label>
            <input type="text" class="form-control" id="name_job" v-model="updatedJobData.name_job">
          </div>
          <div class="form-group">
            <label class="float-left"  for="email">Email:</label>
            <input v-model="updatedJobData.email" class="form-control" id="email" v-validate="'required|email'" name="email" type="text">
            <span class="text-danger">{{ errorMessage }}</span>

          </div>
          <div class="form-group">
            <label class="float-left" for="sum_job">{{ $t('detail.description')}}:</label>
            <textarea rows="5" class="form-control" id="sum_job" v-model="updatedJobData.sum_job"></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-3 float-end">{{ $t('detail.update-job')}}</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { jobId, updateJob } from '@/services/JobService.js'

export default {
  name: 'JobDetail',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      job: {},
      updatedJobData: {
        email: '',
        name_job: '',
        sum_job: ''
      },
      successMessage: null,
      errorMessage: null

    }
  },
  async created () {
    const response = await jobId(this.id)
    if (response) {
      this.job = response
      this.updatedJobData = {...this.job}
    }
  },
  methods: {
    async onSubmit () {
      this.errorMessage = null
      this.$validator.validateAll()
        .then(async result => {
          if (result) {
            const updatedJob = await updateJob(this.job.id, this.updatedJobData)
            console.log(updatedJob)
            this.successMessage = this.$t('message.success')
          } else {
            this.errorMessage = this.errors.first('email')
          }
        })
    }
  }
}
</script>
