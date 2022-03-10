<template>
  <el-main v-loading.fullscreen.lock="cargando">
    <el-page-header
      class="my-3"
      content="Edición de usuario"
      @back="irUsuarios()"
    />
    <hr />

    <div
      class="d-flex justify-content-center justify-content-md-around flex-wrap my-2 my-md-3 px-2 px-md-3 container"
      v-if="usuario != null"
    >
      <div class="d-flex flex-nowrap justify-content-center align-items-center">
        <el-avatar
          :size="128"
          :src="usuario.user.avatar"
          class="_avatar"
        ></el-avatar>
        <img
          :src="icon"
          alt="Se veria una flecha hacia la derecha"
          class="mx-4"
        />
        <el-avatar :size="128" :src="avatar" class="_avatar"></el-avatar>
      </div>
      <div
        class="text-center text-md-end py-2"
        v-if="usuario.employee.length > 0"
      >
        <p class="_semi-bold _letter-spacing-1">@{{ usuario.user.username }}</p>
        <p class="_bold _text-big my-0">
          {{ usuario.employee[0].first_name }}
          {{ usuario.employee[0].last_name }}
        </p>
        <p class="_text-small my-0">{{ usuario.employee[0].email }}</p>
        <p class="_semi-bold">{{ usuario.user.role.title_format }}</p>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between" v-if="usuario != null">
      <div class="_w-50">
        <span
          v-for="(item, index) in images"
          :key="index"
          v-on:click.prevent="seleccionarAvatar(item)"
        >
          <el-avatar :size="64" :src="item" class="_avatar"></el-avatar>
        </span>
        <el-button
          class="d-block mx-auto"
          :disabled="verificarCambioAvatar()"
          v-on:click.prevent="cambiarAvatar(usuario.user.username, avatar)"
        >
          Cambiar &aacute;vatar</el-button
        >
      </div>
      <div class="_w-50 px-2">
        <div class="row _w-75 mx-auto">
          <div class="col-12">
            <span class="text-muted">Contrase&ntilde;a actual</span>
            <el-input
              v-model="password.current"
              class="w-100 my-2"
              type="password"
              size="small"
              show-password
              placeholder="Ingrese su contrase&ntilde;a actual"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Nueva contrase&ntilde;a</span>
            <el-input
              v-model="password.new"
              class="w-100 my-2"
              type="password"
              size="small"
              show-password
              placeholder="Ingrese su nueva contrase&ntilde;a"
            />
          </div>
          <div class="col-12">
            <span class="text-muted">Confirmar contrase&ntilde;a</span>
            <el-input
              v-model="password.confirm"
              class="w-100 my-2"
              type="password"
              size="small"
              show-password
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
        <p class="_w-75 mx-auto _text-justify _text-small text-muted">
          Si desea cambiar su contrase&ntilde;a y su cuenta es de administrador
          deber&aacute; volver a iniciar sesi&oacute;n.
        </p>
      </div>
    </div>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import emojis from "@/scripts/Emojis.js";
import icon from "@/assets/icons/flechaderecha.svg";
export default {
  data() {
    return {
      id: this.$route.params.id,
      cargando: false,
      usuario: null,
      images: emojis,
      avatar: "",
      icon: icon,
      password: {
        current: "",
        new: "",
        confirm: "",
      },
    };
  },
  mounted() {
    this.obtenerUsuario(this.id);
  },
  methods: {
    async obtenerUsuario(id) {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerUsuario(id);
        this.usuario = respuesta.data;
        this.avatar = this.usuario.user.avatar;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener el usuario");
        }
      }
      this.cargando = false;
    },
    seleccionarAvatar(avatar) {
      this.avatar = avatar;
    },
    verificarCambioAvatar() {
      if (this.usuario != null && this.avatar != this.usuario.user.avatar) {
        return false;
      }
      return true;
    },
    async cambiarAvatar(user, avatar) {
      this.cargando = true;
      try {
        await api.cambiarAvatar(user, {
          avatar,
        });
        ElMessage.success("Avatar cambiado correctamente");
        this.obtenerUsuario(this.id);
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al cambiar el avatar");
        }
      }
      this.cargando = false;
    },
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
        await api.cambiarContrasenaEmpleado(this.usuario.user.username, {
          password: datos.current,
          newPassword: datos.new,
        });
        ElMessage.success({
          message: "Contraseña cambiada con éxito",
        });
        this.password = {
          current: "",
          new: "",
          confirm: "",
        };
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
    irUsuarios() {
      this.$router.replace("/usuarios");
    },
  },
};
</script>
<style lang=""></style>
