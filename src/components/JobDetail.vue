<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6 w-50" style=" height: 250px;">
        <img :src="require(`@/assets/img/${job.img_job}`)" :alt="job.name_job" width="250" height="200" class="img-fluid">
      </div>
      <div class="col-md-6">
        <h1 hidden class="mb-4">{{ job.id }}</h1>

        <h1 class="mb-4">{{ job.name_job }}</h1>
        <p class="lead">{{ job.sum_job }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {jobId} from '@/services/JobService.js'

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
      job: {}
    }
  },
  async created () {
    const response = await jobId(this.id)
    console.log(response)
    if (response) {
      this.job = response
    }
  }
}
</script>
