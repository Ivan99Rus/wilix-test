import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: null,
    users: null,
  },
  mutations: {
    setType(state, type) {
      state.type = type
    },
    setUsers(state, users) {
      state.users = users
    }
  },
  actions: {
    asyncGetData(context) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          return response.json()
        })
        .then(data => {
          context.commit('setUsers', data)
        }) 
    }
  },
  getters: {
    getType: state => state.type,
    getUsers: state => state.users,
  }
})