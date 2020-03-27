import Vue from 'vue';

export const state = () => ({
  products: [],
  details: {},
  error: null,
  success: null
});

export const mutations = {
  setDetailsParam (state, [param, value]) {
    Vue.set(state.details, param, value);
  },
  setError(state, error) {
    state.error = error
  },
  setSuccess(state, success) {
    state.success = success
  }
};

export const actions = {
  async saveProduct({ commit, state }) {
    commit('setSuccess', false);
    commit('setError', false);
    try {
      const fd = new FormData();
      const { images, thumb, price, category, name } = state.details;
      fd.append('thumb', thumb);
      fd.append('name', name);
      fd.append('price', price);
      fd.append('category', category);
      for(let i = 0; i < images.length; i++) {
        fd.append('images', images[i]);
      }
      await this.$axios.post('/product', fd);
    } catch ({ message }) {
      console.error(message);
      commit('setError', message);
    }
  }
};
