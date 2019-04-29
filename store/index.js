export const state = () => ({
    authUser: null,
    authToken: null,
    playlist: {
        id : null,
        name :'',
        songs : []
    }
})

export const mutations = {
    setPlaylist (state, playlist) {
        state.playlist = playlist
    },

    setUser (state, user){
        state.authUser = user
    },

    setToken (state, token) {
        state.authToken = token
    }
}

export const getters = {
    getPlaylist (state) {
        return state.playlist
    }
}

export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit, dispatch }, { req }) {
        if (req.session && req.session.token) {
            commit('setToken', req.session.token)
            this.$axios.setHeader('Authorization', req.session.token)
            dispatch('fetchUser')
        }
    },

    async login({ commit }, { email, password }) {
        try {
            const { data, headers } = await this.$axios.post('/users/login', { email, password })
            commit('setUser', data)
            commit('setToken', headers['x-auth'])
            this.$axios.setHeader('Authorization', headers['x-auth'])
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error('Bad credentials')
          }
          throw error
        }
    },

    async logout({ commit }) {
        await axios.post('/api/user/logout')
        commit('setUser', null)
        this.$axios.setHeader('Authorization', false)
    },

    async fetchUser({commit}){
        const { data } = await this.$axios.$get('/users/me')
        commit('setUser', data)
    }
}