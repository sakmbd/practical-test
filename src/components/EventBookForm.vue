<template>
  <v-container>
    <v-alert type="success" v-if="showAlert">
      You have booked successfully!
    </v-alert>
    <v-row>
      <v-col>
        <v-img width="400" :src="event.imgUrl" class="mt-6"></v-img>
      </v-col>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="30"
            :rules="nameRules"
            required>
            <template #label>
              Name <span class="red--text"><strong>*</strong></span>
            </template>
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            required>
            <template #label>
              Email <span class="red--text"><strong>*</strong></span>
            </template>
          ></v-text-field>

          <v-text-field
            v-model="phone"
            :counter="10"
            :rules="phoneRules"
            required>
            <template #label>
              Phone Number <span class="red--text"><strong>*</strong></span>
            </template>
          ></v-text-field>

          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Number of Seats"
            required
          ></v-select>

          <v-text-field
            v-for="(attandee, index) in noOfAttandee"
            :key="index"
            v-model="nameOfAttendee[attandee]"
            :counter="30"
            :rules="nameOfAttendeeRules"
            required>
            <template #label>
              {{ 'Name of Attandee: ' + attandee }} <span class="red--text"><strong>*</strong></span>
            </template>
          ></v-text-field>
          
          <v-btn color="success" class="mr-4" @click="submit" :disabled="disbaled"> Submit </v-btn>
          <v-btn color="warning" class="mr-4" @click="$router.go(-1)" :disabled="disbaled">Cancel</v-btn>
          <v-btn class="mr-4" @click="$router.go(-1)">Go Back</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'BookEventForm',
  props: ['event'],
  data: () => ({
    disbaled: false,
    showAlert: false,
    valid: true,
    name: '',
    nameRules: [
      (v: any) => !!v || 'Name is required',
      (v: string | any[]) =>
        (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      (v: any) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    phone: '',
    phoneRules: [
      (v: any) => !!v || 'Phone Number is required'
    ],
    select: 1,
    items: [1, 2, 3, 4, 5, 6],
    nameOfAttendee: {},
    nameOfAttendeeRules: [
      (v: any) => !!v || 'Phone Number is required'
    ],
    noOfAttandee: 1
  }),
  methods: {
    ...mapMutations([
      'updateEventData'
    ]),
    submit () {
      const error = (this.$refs.form as Vue & { validate: () => boolean }).validate()
      if (error) {
        this.disbaled = true
        this.showAlert = true
        this.$vuetify.goTo(0)
        this.updateEventData({ id: this.$route.params.id, noOfslotToBook: this.noOfAttandee })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }
    }
  },
  watch: {
    select (nV, oV) {
      this.noOfAttandee = parseInt(nV, 10)
    }
  },
  created () {
    let array = []
    if ( this.event.ticketAvailable < 6) {
      for(let i = 1; i <= this.event.ticketAvailable; i++) {
        array.push(i)
      }
      this.items = array
    }
  }
})
</script>
