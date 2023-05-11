<template>
  <div>
    <select v-model="$i18n.locale">
      <option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang">
          {{ lang }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'Language',
  data () {
    return {
      langs: ['en', 'vn']
    }
  }
}
</script>
<style>
select {
    width: 50px;
    line-height: 49px;
    height: 38px;
    font-size: 16px;
    outline: 0;
    margin-bottom: 15px;
}
</style>
