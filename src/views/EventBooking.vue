<template>
  <book-event></book-event>
</template>

<script lang="ts">
import Vue from 'vue'
import BookEvent from '../components/BookEvent.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BookEvent
  }
})
</script>
