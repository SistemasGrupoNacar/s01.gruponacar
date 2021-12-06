<template>
  <div class="_login">
    <AlertComponent />
    <div class="_login-welcome">
      <p class="_text-extra-bigger _text-bold m-0">¡Hola!</p>
      <p class="_text-bold m-0">Bienvenido de nuevo</p>
      <span class="_text-small _text-black-25 px-1">gruponacar/login</span>
    </div>
    <div class="_login-form">
      <form v-on:submit.prevent="login(user)">
        <input
          type="text"
          class="_input w-100 _bg-white-25"
          placeholder="Usuario"
          autocomplete="off"
          v-model="user.username"
        />
        <input
          type="password"
          class="_input w-100 _bg-white-25"
          placeholder="Contraseña"
          autocomplete="off"
          v-model="user.password"
        />
        <button class="_btn _btn-primary w-100 _text-white my-3">
          Iniciar Sesi&oacute;n
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import AlertComponent from "@/components/AlertComponent.vue";
import api from "@/scripts/api.actions";
import { setToken } from "@/scripts/token.actions";
export default {
  name: "LoginView",
  components: {
    AlertComponent,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),

    async login(data) {
      if (data.username != "" && data.password != "") {
        api
          .onLogin(data)
          .then((response) => {
            if (response.status == 200) {
              this.setToken(response.data);
              this.$router.push("/");
            } else {
              this.showNotification(response);
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              this.showNotification(error.response);
            }
          });
      }
    },

    async setToken(token) {
      await setToken(token);
    },

    showNotification(content) {
      this.updateResponse({
        content,
        display: true,
      });
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/css/views/LoginView.css";
</style>
