import EVENTS_DATA from '../../json/events.json'

const state = {
  eventsObject: EVENTS_DATA
}

const getters = {
  eventsObject: state => state.eventsObject
}

const mutations = {
  updateEventData: (state, updatedData) => (
    state.eventsObject.findIndex(obj => {
      if (obj.id == updatedData.id) {
        obj.ticketAvailable = obj.ticketAvailable - updatedData.noOfslotToBook
      }
    })
  )
}

export default {
  state,
  getters,
  mutations
}
