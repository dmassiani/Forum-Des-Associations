export const state = () => ({
  coordinate: {}
})

export const mutations = {

  // --------------------------------
  // Location
  // --------------------------------
  add(state, location) {
    state.coordinate = location
  },
  remove(state, { location }) {
    state.coordinate = {}
  },

}
