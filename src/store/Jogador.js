export default {
  state: {
    names: [],
    gamers: [],
    last: {}
  },
  actions: {
    insertNames ({ commit }, json) {
      commit('postNames', json)
    },
    insertGamers ({ commit }, json) {
      commit('postGamers', json)
    }
  },
  mutations: {
    postNames (state, data) {
      state.names.push(data[0])
    },
    postGamers (state, data) {
      state.gamers.push(data[0])
    }
  },
  getters: {
    getGamers: (state) => {
      let newArray = []
      for (let index = 0; index < state.names.length; index++) {
        newArray.push(
          {
            name: state.names[index].name,
            time: state.gamers[index].time,
            score: state.gamers[index].score
          }
        )
      }
      state.last = {}
      var size = 0
      size = newArray.length
      state.last = newArray[size - 1]
      newArray.sort(function (a, b) {
        if (a.score < b.score) return -1
        if (a.score > b.score) return 1
        return 0
      })
      return newArray
    },
    getUser: (state) => {
      return state.last
    }
  }
}
