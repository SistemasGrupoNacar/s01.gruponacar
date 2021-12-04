<template>
  <div class="_login">
    <AlertComponent />
    <div
      class="d-flex flex-column flex-wrap justify-content-center align-items-center text-center mx-3"
    >
      <p
        class="_login-information-text _text-black _text-semi-bold _letter-spacing-big text-uppercase m-0"
      >
        Inicio de Sesi&oacute;n
      </p>
      <p class="_text-regular _text-big m-0">Grupo Nacar</p>
      <div
        class="_login-username-show d-flex flex-column justify-content-center align-items-end"
      >
        <p
          class="my-4 _text-light _text-normal align-self-end"
          v-on:click="editUsername"
          v-if="user.username != ''"
        >
          Iniciando sesi&oacute;n como: @{{ user.username }}
        </p>
      </div>
      <input
        type="text"
        class="_input-text my-2"
        placeholder="Nombre de usuario"
        v-model="user.username"
        v-on:keyup.enter="usernameIsOk"
        ref="username"
        v-show="!showPasswordField"
        autofocus
        autocomplete="off"
      />
      <input
        type="password"
        class="_input-text my-2"
        placeholder="Contraseña"
        v-model="user.password"
        v-on:keyup.enter="passwordIsOk"
        v-show="showPasswordField"
        ref="password"
        autocomplete="off"
      />

      <span class="_text-light _text-small my-0"
        >Presione Enter para continuar</span
      >
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import AlertComponent from "@/components/AlertComponent.vue";
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
      showPasswordField: false,
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    usernameIsOk() {
      if (this.user.username != "") {
        this.showPasswordField = true;
        setTimeout(() => {
          this.$refs.password.focus();
        }, 200);
      }
    },
    passwordIsOk() {
      if (this.user.password != "") {
        console.log(this.user);
      }
    },
    editUsername() {
      this.showPasswordField = false;
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
