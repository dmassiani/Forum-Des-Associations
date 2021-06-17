export const state = () => ({
  distance: 1500
})

export const mutations = {

  // --------------------------------
  // Distance
  // --------------------------------
  set(state, distance) {
    state.distance = distance
  },
  reset(state, { distance }) {
    state.distance = 1500
  },

}
