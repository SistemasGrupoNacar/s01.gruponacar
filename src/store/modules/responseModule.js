export default {
  namespaced: true,
  state: {
    response: {
      content: {
        status: "",
      },
      display: false,
    },
  },
  mutations: {
    updateResponse(state, payload) {
      state.response = payload;
      setTimeout(() => {
        state.response.display = false;
      }, 3000);
    },
  },
  actions: {},
  getters: {},
};
