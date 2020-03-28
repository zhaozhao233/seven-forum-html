<template>
  <div>
    <search></search>
    <router-view/>
  </div>
</template>

<script>
  import Search from './common/Search'
    export default {
      name: 'Home',
      components: {Search}
    }
</script>

<style scoped>

</style>
