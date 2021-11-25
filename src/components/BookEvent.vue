<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center">
        {{ event.name }}
      </v-card-title>
      <v-row>
        <v-col cols="12" class="text-center">{{ event.eventDate }}</v-col>
        <v-col cols="12" class="text-center">Ticket Available: {{ event.ticketAvailable }}</v-col>
      </v-row>
      <v-card-text>
        <hr>
        <book-event-form :event="event"></book-event-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BookEventForm from './EventBookForm.vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'BookEvent',
  components: {
    BookEventForm
  },
  data: () => ({
    event: {}
  }),
  computed: {
    ...mapGetters({
      EVENTS_DATA: 'eventsObject'
    })
  },
  created () {
    this.event = this.EVENTS_DATA.find((item: { id: string }) => item.id == this.$route.params.id)
  }
})
</script>
