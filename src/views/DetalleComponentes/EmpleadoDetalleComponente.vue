<template>
  <el-main class="py-2 px-1 px-lg-4" v-loading.fullscreen.lock="cargando">
    <el-page-header
      class="my-3"
      content="Personalización de usuario"
      @back="irEmpleados()"
    />
    <hr />
    <div class="row px-1 my-2">
      <div class="col-12 col-md-4 my-2 text-center">
        <p class="_text-bigger text-center">Detalles de usuario</p>
        <el-avatar :size="128" :src="avatar" class="_avatar"></el-avatar>
        <p class="_subtitle">{{ username }}</p>
      </div>
      <div class="col-12 col-md-4 my-2">
        <p class="_text-bigger text-center">
          Selecci&oacute;n de &aacute;vatar
        </p>
        <div class="container text-center">
          <span
            v-for="(item, index) in images"
            :key="index"
            v-on:click.prevent="seleccionarAvatar(item)"
          >
            <el-avatar :size="64" :src="item" class="_avatar"></el-avatar>
          </span>

          <el-button
            v-on:click.prevent="cambiarAvatar(avatar)"
            class="w-100 my-2"
          >
            Cambiar &aacute;vatar
          </el-button>
        </div>
      </div>
      <div class="col-12 col-md-4 my-2">
        <p class="_text-bigger text-center">Cambio de contrase&ntilde;a</p>
        <div class="row">
          <div class="col-12">
            <span class="text-muted">Contrase&ntilde;a actual</span>
            <el-input
              v-model="password.current"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su contrase&ntilde;a actual"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Nueva contrase&ntilde;a</span>
            <el-input
              v-model="password.new"
              class="w-100 my-2"
              type="password"
              placeholder="Ingrese su nueva contrase&ntilde;a"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Confirmar contrase&ntilde;a</span>
            <el-input
              v-model="password.confirm"
              class="w-100 my-2"
              type="password"
              placeholder="Confirme su nueva contrase&ntilde;a"
            />
            <el-button
              v-on:click.prevent="cambiarContrasena(password)"
              class="w-100 my-2"
            >
              Cambiar contrase&ntilde;a
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <p
      class="_link _semi-bold my-4 my-md-1 mx-4"
      v-on:click.prevent="irEmpleados()"
    >
      <el-icon><arrow-right /></el-icon> Ir a listado de empleados
    </p>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import emojis from "@/scripts/Emojis.js";
export default {
  props: ["username", "_id"],
  components: {
    ArrowRight,
  },
  data() {
    return {
      cargando: false,
      password: {
        current: "12345678",
        new: "",
        confirm: "",
      },
      avatar: "",
      images: emojis,
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
    seleccionarAvatar(avatar) {
      this.avatar = avatar;
    },
    async cambiarAvatar(avatar) {
      this.cargando = true;
      try {
        await api.cambiarAvatar(this.username, {
          avatar,
        });
        ElMessage.success({
          message: "Avatar cambiado con éxito",
        });
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
            message: "Error al cambiar el avatar",
          });
        }
      }
      this.cargando = false;
    },
    irEmpleados() {
      this.$router.replace("/empleados");
    },
  },
};
</script>
<style lang=""></style>
