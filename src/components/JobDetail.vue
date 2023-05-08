<template>
  <div>
    <h1>Job Detail</h1>
    <p>ID: {{ job.id }}</p>
    <p>Job Name: {{ job.name_job }}</p>
    <p>Job Summary: {{ job.sum_job }}</p>
  </div>
</template>

<script>
import jobs from '@/json/JobList.json'

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
  created () {
    this.job = jobs.find(job => job.id === +this.id)
  }
}
</script>
