<template>
  <list />
</template>

<script lang="ts">
import Vue from 'vue'
import List from '../components/List.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    List
  }
})
</script>
