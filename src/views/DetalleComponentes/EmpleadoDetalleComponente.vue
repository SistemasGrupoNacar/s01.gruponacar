<template>
  <el-main
    class="_h-100 d-flex justify-content-center align-items-center flex-wrap flex-column"
  >
    <div class="my-3">
      {{ username }}
      <div class="container">
        <p>Cambiar contrase&ntilde;a</p>
        <div class="row">
          <div class="col-12 col-md-4 my-2">
            <span class="text-muted">Contrase&ntilde;a actual</span>
            <el-input
              v-model="password.current"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su contrase&ntilde;a actual"
            />
          </div>
          <div class="col-12 col-md-4 my-2">
            <span class="text-muted">Nueva contrase&ntilde;a</span>
            <el-input
              v-model="password.new"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su nueva contrase&ntilde;a"
            />
          </div>
          <div class="col-12 col-md-4 my-2">
            <span class="text-muted">Confirmar contrase&ntilde;a</span>
            <el-input
              v-model="password.confirm"
              class="w-100 my-2"
              type="password"
              placeholder="Confirme su nueva contrase&ntilde;a"
            />
          </div>
          <el-button v-on:click.prevent="cambiarContrasena(password)">
            Cambiar contrase&ntilde;a
          </el-button>
        </div>
      </div>
    </div>

    <router-link to="/empleados">Volver a listado de empleados</router-link>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  props: ["username", "_id"],
  data() {
    return {
      cargando: false,
      password: {
        current: "12345678",
        new: "",
        confirm: "",
      },
    };
  },
  methods: {
    async cambiarContrasena(datos) {
      this.cargando = true;
      if (!this.verificarContrasena(datos)) {
        ElMessage.error(
          "Verifique que las contraseñas coincidan y no estén vacías"
        );
        this.cargando = false;
        return;
      }
      try {
        await api.cambiarContrasenaEmpleado(this.username, {
          password: datos.current,
          newPassword: datos.new,
        });
        ElMessage.success({
          message: "Contraseña cambiada con éxito",
        });
        this.$router.replace("/empleados");
      } catch (error) {
        if (error.response) {
          if (error.response.status == 422) {
            ElMessage.error(
              "Verifique que se envian todos los datos correctamente"
            );
          }
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: error.message,
          });
        }
      }
      this.cargando = false;
    },
    verificarContrasena() {
      if (
        this.password.new !== this.password.confirm ||
        this.password.new === "" ||
        this.password.confirm === "" ||
        this.password.current === ""
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
