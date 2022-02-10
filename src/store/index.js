import { createStore } from "vuex";

export default createStore({
  state: {
    titulo: "",
    user: {},
  },
  mutations: {
    cambiarTitulo(state, titulo) {
      state.titulo = titulo;
    },
    cambiarUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
