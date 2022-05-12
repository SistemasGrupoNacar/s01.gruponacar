<template>
  <el-page-header
    class="my-3"
    content="Creaci&oacute;n de usuario"
    @back="irUsuarios()"
  />
  <hr />
  <el-main v-loading.fullscreen.lock="cargando" class="">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 my-2">
          <div class="row d-flex flex-nowrap align-items-center">
            <div class="col-8">
              <span class="text-muted">Nombre de usuario</span>
              <el-input
                v-model="usuario.username"
                class="w-100 my-2"
                placeholder="Ingrese nombre de usuario"
                v-on:keyup.enter="verificarUsuario(usuario)"
                :disabled="disponibilidad"
              />
            </div>
            <div class="col-4">
              <el-button
                class="w-100"
                v-on:click.prevent="verificarUsuario(usuario)"
                >Verificar</el-button
              >
            </div>
          </div>
        </div>
        <div class="col-12 col-md-3 my-2">
          <span class="text-muted">Contrase&ntilde;a</span>
          <el-input
            v-model="usuario.password"
            class="w-100 my-2"
            placeholder="Ingrese contrase&ntilde;a"
            show-password
            :disabled="!disponibilidad"
          />
        </div>
        <div class="col-12 col-md-3 my-2">
          <span class="text-muted">Rol de usuario</span>
          <el-select
            v-model="usuario.role"
            placeholder="Seleccione el rol"
            class="w-100 my-2"
            filterable
            :disabled="!disponibilidad"
          >
            <el-option
              v-for="item in roles"
              :key="item._id"
              :label="item.title_format"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-12 my-2">
          <p class="text-muted">Selecci&oacute;n de &aacute;vatar</p>
          <span
            v-for="(item, index) in images"
            :key="index"
            v-on:click.prevent="seleccionarAvatar(item)"
          >
            <el-avatar
              :size="64"
              :src="item"
              class="_avatar"
              :class="[
                usuario.avatar === item
                  ? '_avatar-selected'
                  : '_avatar-unselected',
              ]"
            ></el-avatar>
          </span>
        </div>
        <div class="col-12 my-2">
          <el-button
            class="_w-50 d-block mx-auto"
            v-on:click.prevent="crearUsuario(usuario)"
            :disabled="!disponibilidad"
            size="large"
            >Guardar</el-button
          >
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import emojis from "@/scripts/Emojis.js";
export default {
  data() {
    return {
      cargando: false,
      usuario: {
        username: "",
        role: "",
        password: "",
        avatar: "",
      },
      roles: [],
      disponibilidad: false,
      images: emojis,
    };
  },
  mounted() {
    this.obtenerRoles();
  },
  methods: {
    async obtenerRoles() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerRoles();
        this.roles = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los roles");
        }
      }
      this.cargando = false;
    },
    async verificarUsuario(usuario) {
      this.cargando = true;
      try {
        await api.verificarUsuario(usuario);
        this.disponibilidad = true;
        ElMessage.success("Usuario disponible, puede continuar");
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al verificar el usuario");
        }
      }
      this.cargando = false;
    },
    async crearUsuario(usuario) {
      this.cargando = true;
      try {
        if (this.validarUsuario(usuario)) {
          await api.crearUsuario(usuario);
          ElMessage.success("Usuario creado con exito");
          this.$router.push("/usuarios");
        } else {
          this.cargando = false;
          return;
        }
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al crear el usuario");
        }
      }

      this.cargando = false;
    },
    validarUsuario(usuario) {
      if (usuario.username.length < 3) {
        ElMessage.warning(
          "El nombre de usuario debe tener al menos 3 caracteres"
        );
        return false;
      }
      if (usuario.password.length < 6) {
        ElMessage.warning("La contraseña debe tener al menos 6 caracteres");
        return false;
      }
      if (usuario.role === "") {
        ElMessage.warning("Debe seleccionar un rol");
        return false;
      }

      return true;
    },
    seleccionarAvatar(avatar) {
      this.usuario.avatar = avatar;
    },
    irUsuarios() {
      this.$router.replace("/usuarios");
    },
  },
};
</script>
<style lang=""></style>
