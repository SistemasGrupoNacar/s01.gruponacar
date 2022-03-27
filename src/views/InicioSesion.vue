<template>
  <span class="_btn _ajustes">
    <img :src="require('@/assets/illustrations/options.svg')" alt="Opciones" />
    <div class="_btn-actions">
      <el-button type="text" v-on:click.prevent="reportarProblema()"
        >Reportar un problema</el-button
      >
    </div>
  </span>
  <el-main v-loading.fullscreen.lock="cargando"
    ><div class="row _h-90 w-100 p-0 m-0">
      <div
        class="col-12 col-md-6 _details text-center d-flex justify-content-center align-items-center"
      >
        <div class="_w-50">
          <p class="_bold _letter-spacing-1 _text-big">¡Hola Administrador!</p>
          <p class="_subtitle">
            Ingresa tus credenciales para acceder al portal de
            administraci&oacute;n del sistema
          </p>
        </div>
      </div>
      <div
        class="col-12 col-md-6 _login text-center _w-50 d-flex flex-column px-5 px-lg-0 m-0 justify-content-center align-items-center"
      >
        <div class="more-info">
          <p class="_bold _letter-spacing-1 _text-big">¡Hola Administrador!</p>
          <p class="_subtitle">
            Ingresa tus credenciales para acceder al portal de
            administraci&oacute;n del sistema
          </p>
        </div>
        <el-input
          v-model="credenciales.username"
          class="_w-50 m-2"
          placeholder="Ingrese nombre de usuario"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template> </el-input
        ><el-input
          v-model="credenciales.password"
          class="_w-50 m-2"
          placeholder="Ingrese contrase&ntilde;a"
          type="password"
          @keyup.enter="iniciarSesion(credenciales)"
          show-password
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Warning /></el-icon>
          </template>
        </el-input>

        <el-button
          size="large"
          class="_w-50 m-2"
          round
          v-on:click.prevent="iniciarSesion(credenciales)"
        >
          Iniciar Sesi&oacute;n</el-button
        >
      </div>
    </div></el-main
  >
</template>
<script>
import { ElMessage } from "element-plus";
import { User, Warning } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { setToken } from "@/scripts/Token.js";
export default {
  components: {
    User,
    Warning,
  },
  data() {
    return {
      credenciales: {
        username: "",
        password: "",
      },
      cargando: false,
    };
  },
  methods: {
    async iniciarSesion(datos) {
      this.cargando = true;
      if (!this.verificarCredenciales(datos)) {
        ElMessage.warning("Por favor ingrese un usuario y contraseña válidos");
        this.cargando = false;
        return;
      }
      try {
        const respuesta = await api.iniciarSesion({
          username: datos.username,
          password: datos.password,
          type: "Admin",
        });
        await setToken(respuesta.data);
        this.$router.replace("/home");
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 403) {
          ElMessage.error(error.response.data.message);
          this.cargando = false;
          return;
        }
        ElMessage.error("Error, por favor intente más tarde");
      }
      this.cargando = false;
    },
    verificarCredenciales(datos) {
      if (datos.username == "") {
        return false;
      }
      if (datos.password == "") {
        return false;
      }
      return true;
    },
    reportarProblema() {
      window.open(
        "mailto:sistemas.gruponacar@gmail.com?Subject=Problemas%20con%20inicio%20de%20sesión",
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss">
._login {
}
._details {
  display: none !important;
}

.more-info {
  margin-bottom: 3rem;
}
/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
  ._details {
    display: flex !important;
  }
  .more-info {
    display: none;
  }
}

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up)*/
@media (min-width: 1200px) {
}
</style>
