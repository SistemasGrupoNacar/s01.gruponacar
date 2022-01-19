import { createStore } from "vuex";

export default createStore({
  state: {
    titulo: "",
  },
  mutations: {
    cambiarTitulo(state, titulo) {
      state.titulo = titulo;
    },
  },
  actions: {},
  modules: {},
});
