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
    state.error = error;
  },
  setSuccess(state, success) {
    state.success = success;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setDetails(state, details) {
    state.details = details;
  }
};

export const actions = {
  async saveProduct({ commit, state }) {
    commit('setSuccess', false);
    commit('setError', false);
    try {
      const fd = new FormData();
      const { images, thumb, price, category, name } = state.details;
      fd.append('thumb', thumb.url);
      fd.append('name', name);
      fd.append('price', price);
      fd.append('category', category);
      if(images){
        for(let i = 0; i < images.length; i++) {
          if(!images[i]._id) {
            fd.append('images', images[i]);
          }
        }
      }
      if(state.details._id) {
        await this.$axios.put(`/product/${state.details._id}`, fd);
        commit('setSuccess', 'Product edited');
      } else {
        await this.$axios.post('/product', fd);
        commit('setSuccess', 'Product saved');
      }
    } catch ({ message }) {
      console.error(message);
      commit('setError', message);
    }
  },
  async getProducts({ commit }) {
    try {
      const { data } = await this.$axios.get('/product');
      commit('setProducts', data.data);
    } catch({ message }) {
      console.error(message);
      commit('setError', message);
    }
  },
  async removeProduct({ commit }, id) {
    commit('setSuccess', false);
    commit('setError', false);
    try {
      await this.$axios.delete(`/product/${id}`);
      commit('setSuccess', 'Product removed');
    } catch ({ message }) {
      console.error(message);
      commit('setError', message);
    }
  },
  async getProduct({ commit }, id) {
    commit('setError', false);
    try {
      const { data } = await this.$axios.get(`/product/${id}`);
      commit('setDetails', data.data);
    } catch ({ message }) {
      console.error(message);
      commit('setError', message)
    }
  }
};
