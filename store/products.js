import Vue from 'vue';

export const state = () => ({
  products: [],
  details: {}
});

export const mutations = {
  setDetailsParam (state, [param, value]) {
    Vue.set(state.details, param, value);
    //@input="setDetailsParam(['title', $event])"
  },
};

export const actions = {

};
