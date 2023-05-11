<template>

  <div id="app">
    <div class="d-flex align-items-center float-end" style="margin-right: 60px;">
      <div class="ml-auto">
        <ChangeLanguage />
      </div>
    </div>
      <h1 class="text-center">{{ $t('job-list.list')}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import ChangeLanguage from '@/components/Language.vue'
import JobList from './components/JobList.vue'

export default {
  name: 'App',
  components: {
    ChangeLanguage,
    JobList
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
