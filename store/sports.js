export const state = () => ({
  sports: [
    "Aïkido",
    "Athlétisme",
    "Aviron",
    "Badminton",
    "Baseball",
    "Basketball",
    "Basket",
    "BMX",
    "Boxe",
    "Canoë",
    "Canoë-kayak",
    "Capoeira",
    "Cheerleading",
    "Cricket",
    "Danse",
    "Double Dutch",
    "Escalade",
    "Escrime",
    "Floorball",
    "Football",
    "Football américain",
    "Football australien",
    "Football gaélique",
    "Futsal",
    "Gymnastique",
    "Gymnastique rythmique",
    "Haka pei",
    "Hakko-Ryu",
    "Handball",
    "Hockey",
    "Hockey sur gazon",
    "Hockey sur glace",
    "Hapkido",
    "Iaïdo",
    "Ju-Jitsu",
    "Judo",
    "Jiu-jitsu brésilien",
    "Karaté",
    "Kempo",
    "Kendo",
    "Kenjutsu",
    "Kick-boxing",
    "Kendo",
    "Kempo",
    "Kin-ball",
    "Kobudo",
    "Kung fu",
    "Krav maga",
    "Lutte",
    "Netball",
    "Omnikin",
    "Padel",
    "Parkour",
    "Patinage",
    "Patinage artistique",
    "Patinage de vitesse",
    "Patinage synchronisé",
    "Pelote basque",
    "Plumfoot",
    "Polo",
    "Quidditch",
    "Roller",
    "Rugby",
    "Roller derby",
    "Slamball",
    "Softball",
    "Squash",
    "Taekwondo",
    "Tchoukball",
    "Tennis",
    "Tennis de table",
    "Tir à l'arc",
    "Tricking",
    "Twirling",
    "Ultimate",
    "Volleyball",
    "Volley",
    "Waterpolo",
  ],
  resultats: []
})

export const mutations = {

  // --------------------------------
  // Sports
  // --------------------------------
  add(state, location) {
    state.sports.push(location)
  },

  // --------------------------------
  // Resultats
  // --------------------------------
  addResult(state, resultat) {
    state.resultats.push(resultat)
  },
  resetResult(state) {
    console.log('reset state resultats des sports');
    state.resultats = []
  }

}
