<template>
  <el-main v-loading="cargando">
    <div class="d-flex justify-content-center align-items-center _w-40 mx-auto">
      <div class="container">
        <span class="text-muted">Contrase&ntilde;a actual</span>
        <el-input
          v-model="datos.password"
          type="password"
          placeholder="Ingrese antigua contrase&ntilde;a"
          prefix-icon="el-icon-lock"
          clearable
        ></el-input
        ><span class="text-muted">Repita su contrase&ntilde;a actual</span>
        <el-input
          v-model="datos.passwordConfirmation"
          type="password"
          placeholder="Repita su actual contrase&ntilde;a"
          prefix-icon="el-icon-lock"
          clearable
        ></el-input>
        <span class="text-muted">Contrase&ntilde;a nueva</span>
        <el-input
          v-model="datos.newPassword"
          type="password"
          placeholder="Ingrese nueva contrase&ntilde;a"
          prefix-icon="el-icon-lock"
          clearable
        ></el-input>
        <el-button
          class="w-50 my-2 mx-auto"
          v-on:click.prevent="cambiarContrasena(datos)"
          >Cambiar Contrase&ntilde;a</el-button
        >
      </div>
    </div>
  </el-main>
</template>
<script>
import { ElMessage } from "element-plus";
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
        ElMessage.success({
          message: "Contraseña cambiada con exito",
        });
      }
      this.cargando = false;
      return;
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
