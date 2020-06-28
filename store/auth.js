import Vue from 'vue';

export const state = () => ({
  user: {},
  error: '',
  token: '',
  submitType: 'register'
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error;
  },
  setToken(state, token) {
    state.token = token;
  },
  setSubmitType(state, type) {
    state.submitType = type;
  }
};

export const actions = {
  async postUserData({ state, commit }, payload){
    commit('setError', '');
    commit('setUser', {});
    try {
      const { data } = await this.$axios.post(`auth/${state.submitType}`, payload);
      if(data.success){
        commit('setUser', data.user);
        commit('setToken', data.token);
        localStorage.setItem('soap', data.token);
        this.$router.push('/');
      } else {
        commit('setError', data.error);
      }
    }
    catch (e) {
      commit('setError', e.message);
    }
  }
};
