<template>
  <v-container>
    <v-card>
      <v-card-title>
        Events({{ eventsData.length }})
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="4"
          v-for="event in eventsData" :key="event.id"
          >
          <v-card
            class="ma-10"
            max-width="400"
          >
            <v-img
              height="200"
              :src="event.imgUrl"
            ></v-img>
            <v-card-title>{{ event.name }}</v-card-title>
            <v-card-text>
              <v-row no-gutters>
              {{ event.eventDate }}
              <v-spacer></v-spacer>
              <p>Ticket Available: {{ event.ticketAvailable > 0 ? event.ticketAvailable : 'N/A' }}</p>
              </v-row>
              <v-btn
                block
                outlined
                color="orange"
                :disabled="event.ticketAvailable > 0 ? false : true"
                @click="bookEvent(event.id)"
              >
                <v-icon>
                  event
                </v-icon>
                &nbsp;
                {{ event.ticketAvailable > 0 ? 'Book Event' : 'Sold Out' }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br/>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
  name: 'List',
  computed: {
    ...mapGetters({
      EVENTS_DATA: 'eventsObject'
    })
  },
  data: () => ({
    search: '',
    eventsData: []
  }),
  created () {
    // Get the data from vuex getters and assign to data variable
    // That is for searching porpose otherise we can render data directly from getters
    this.eventsData = this.EVENTS_DATA
  },
  watch: {
    search (newValue) {
      if (newValue === '') { // If search input is empty then assign again whole data back
        this.eventsData = this.EVENTS_DATA
      } else { // If search input have value then triggering search filter method
        this.searchEvent()
      }
    }
  },
  methods: {
    searchEvent () {
      this.eventsData = this.EVENTS_DATA.filter((item: { name: string }) => item.name.toLowerCase().includes(this.search))
    },
    bookEvent (id: string) {
      this.$router.push(`/book-event/${id}`)
    }
  }
})
</script>
