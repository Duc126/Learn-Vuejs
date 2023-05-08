import Vue from 'vue'
import Router from 'vue-router'

import JobDetail from '@/components/JobDetail.vue'
import JobList from '@/components/JobList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'JobList',
      component: JobList
    },
    {
      path: '/job-detail/:id',
      name: 'JobDetail',
      component: JobDetail,
      props: true,
      meta: {
        title: 'Job detail page'
      }
    }

  ]
})
