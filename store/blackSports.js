export const state = () => ({
  sports: [
    "Paintball",
    "Babyfoot",
    "Racing",
    "Écuries",
    "Festival",
    "d'accompagnement",
    "Médecins",
    "Amitié",
    "Nordique",
    "Billard",
    "investisseurs",
    "Moto",
    "Mairie",
    "Equestre",
    "Gymnase",
    "Photographique",
    "Photographie",
    "Cancer",
    "KONE",
    "Hippique",
    "shop",
    "Records",
    "Automobile",
  ]
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
