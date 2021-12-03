<template>
  <div>
    <div class="_login">
      <AlertComponent :response="stateResponse" />
      <div class="_information-login-container">
        <p class="_information-login-title ">
          Grupo <span class="_text-primary">NACAR</span>
        </p>
        <hr class="_hr-primary" />
        <p class="_information-login-subtitle _text-black-75">
          Inicio de Sesi&oacute;n
        </p>
        <p class="_information-login-text _text-black-50">
          Portal de administraci&oacute;n S01.
        </p>
      </div>

      <form
        v-on:submit.prevent="loginMethod(user)"
        class="_form-login-container"
      >
        <label for="username">Usuario</label>
        <input
          type="text"
          class="form-control form-login-input my-3"
          id="username"
          v-model="user.username"
          placeholder="XXXXXXXX"
        />

        <label for="password">Contraseña</label>
        <input
          type="password"
          class="form-control form-login-input my-3"
          id="password"
          v-model="user.password"
          placeholder="**********"
        />
        <button class="btn" type="submit">Iniciar Sesion</button>
      </form>
    </div>
  </div>
</template>
<script>
import AlertComponent from "@/components/AlertComponent.vue";
import tokenActions from "@/scripts/tokenActions.js";
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
      stateResponse: {
        response: false,
        display: false,
      },
    };
  },
  methods: {
    async loginMethod(data) {
      if (data.username != "" && data.password != "") {
        //consumo de api
        console.log("Bien");
      } else {
        this.showMessage({}, "Llene todos los campos.");
      }
    },
    setCookieUserId() {
      console.log(tokenActions.getPayloadToken());
      const user = tokenActions.getPayloadToken();
      this.$cookies.set("userId", user.username);
    },
    setCookieUserLyrics() {
      const user = tokenActions.getPayloadToken();
      const lyrics = user.firstName.slice(0, 1) + user.lastName.slice(0, 1);
      this.$cookies.set("userLyrics", lyrics);
    },

    showMessage(response, msg) {
      this.stateResponse.response = response;
      this.stateResponse.msg = msg;
      this.stateResponse.display = true;
      setTimeout(() => {
        this.stateResponse.display = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss">
._login {
  height: 100vh;
  margin: 0;
  padding: 0rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

//information container

._information-login-title {
  font-size: 3rem;
  letter-spacing: 5px;
  font-weight: 400;
  margin: 0;
}
._information-login-subtitle {
  font-size: 1.5rem;
  font-weight: 200;
  margin: 0;
}

._information-login-text {
  font-size: 0.9rem;
  margin: 1rem 0;
}
//form container
.form-login-container {
  width: 100%;
}
._form-login-input {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  ._form-login-container {
    width: 30%;
  }
  ._information-login-container {
    max-width: 40%;
  }
}
</style>
