<template>
  <el-main v-loading.fullscreen.lock="cargando">
    <div
      class="d-flex flex-column flex-md-row justify-content-center align-items-center min-h-50 px-2 px-md-5 py-2 mx-auto"
    >
      <div class="w-100 text-center my-3 my-md-1">
        <p class="_bold _text-biggest">Cambio de contrase&ntilde;a</p>
        <p class="_subtitle">
          Los cambios realizados se aplicar&aacute;n instant&aacute;neamente y
          la sesi&oacute;n se cerrar&aacute;.
        </p>
      </div>
      <div class="container my-3 my-md-1">
        <div class="text-start text-md-end my-2">
          <span class="text-muted">Contrase&ntilde;a actual</span>
          <el-input
            v-model="datos.password"
            type="password"
            show-password
            placeholder="Ingrese antigua contrase&ntilde;a"
            prefix-icon="el-icon-lock"
            class="_w-50 mx-3"
            clearable
          ></el-input>
        </div>
        <div class="text-start text-md-end my-2">
          <span class="text-muted">Repita su contrase&ntilde;a actual</span>
          <el-input
            v-model="datos.passwordConfirmation"
            type="password"
            show-password
            placeholder="Repita su actual contrase&ntilde;a"
            class="_w-50 mx-3"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </div>
        <div class="text-start text-md-end my-2">
          <span class="text-muted">Contrase&ntilde;a nueva</span>
          <el-input
            v-model="datos.newPassword"
            type="password"
            show-password
            placeholder="Ingrese nueva contrase&ntilde;a"
            prefix-icon="el-icon-lock"
            class="_w-50 mx-3"
            clearable
          ></el-input>
        </div>

        <el-button
          class="d-block mx-auto _w-50 my-2"
          v-on:click.prevent="cambiarContrasena(datos)"
          >Cambiar Contrase&ntilde;a</el-button
        >
      </div>
    </div>
  </el-main>
</template>
<script>
import { ElMessage } from "element-plus";
import api from "@/api/index.js";
import { verificarSesion } from "@/scripts/Sesion.js";
export default {
  data() {
    return {
      cargando: false,
      datos: {
        password: null,
        passwordConfirmation: null,
        newPassword: null,
      },
    };
  },
  methods: {
    async cambiarContrasena(datos) {
      this.cargando = true;
      if (this.verificarContrasena(datos)) {
        try {
          await api.cambiarContrasena(datos);
          ElMessage.success("Contraseña cambiada con exito");
          this.cerrarSesion();
        } catch (error) {
          this.cargando = false;
          if (error.response) {
            verificarSesion(error);
            if (error.response.status == 422) {
              error.response.data.forEach((element) => {
                ElMessage.error(element.message);
              });
            } else {
              ElMessage.error(error.response.data.message);
            }
          } else {
            ElMessage.error({
              message: "Error al cambiar contraseña",
            });
          }
        }
      }
      this.cargando = false;
      return;
    },
    cerrarSesion() {
      localStorage.removeItem("jwt");
      this.$router.go("/login");
    },
    verificarContrasena(datos) {
      if (datos.password === null) {
        ElMessage.warning({
          message: "Ingrese su contraseña actual",
        });
        return false;
      }
      if (datos.passwordConfirmation === null) {
        ElMessage.warning({
          message: "Repita su contraseña actual",
        });
        return false;
      }
      if (datos.newPassword === null) {
        ElMessage.warning({
          message: "Ingrese su nueva contraseña",
        });
        return false;
      }
      if (datos.password != datos.passwordConfirmation) {
        ElMessage.warning("Las contraseñas no coinciden");
        return false;
      }
      if (datos.newPassword.length < 6) {
        ElMessage.warning("La contraseña debe tener al menos 6 caracteres");
        return false;
      }
      if (datos.newPassword == datos.password) {
        ElMessage.warning(
          "La nueva contraseña no puede ser igual a la anterior"
        );
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
