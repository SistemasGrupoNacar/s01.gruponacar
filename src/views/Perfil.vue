<template>
  <el-main>
    <div class="container my-2">
      <el-container
        class="w-100 my-2"
        style="min-height: 100px"
        v-loading="cargando"
      >
        <div class="row w-100" v-if="usuario != null">
          <div class="col-12 col-md-5 text-center">
            <el-avatar
              :size="128"
              :src="usuario.user.avatar"
              class="_avatar"
            ></el-avatar>
          </div>
          <div
            class="col-12 col-md-7 d-flex flex-wrap flex-column align-items-center justify-content-center"
          >
            <p class="_letter-spacing-1">
              Nombre de usuario:
              <span class="_semi-bold">{{ usuario.user.username }}</span>
            </p>
            <p class="_letter-spacing-1">
              Tipo de usuario:
              <span class="_semi-bold">{{
                usuario.user.role.title_format
              }}</span>
            </p>
          </div>
        </div>
      </el-container>
      <div class="">
        <el-button
          class="d-block _w-50 mx-auto"
          v-on:click.prevent="cerrarSesion()"
          >Cerrar Sesi&oacute;n</el-button
        >
      </div>
    </div>
  </el-main>
  <div class="px-5 py-3">
    <p class="_subtitle my-3">M&aacute;s acciones</p>
    <p class="my-1 _hover" v-on:click.prevent="cambiarContrasena()">
      - Cambiar contrase&ntilde;a
    </p>
    <p class="my-1 _hover" v-on:click.prevent="reportarProblema()">
      - Reportar un problema
    </p>
  </div>
</template>
<script>
import { getPayloadToken } from "@/scripts/Token.js";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      payloadToken: "",
      usuario: null,
      cargando: false,
    };
  },
  mounted() {
    this.obtenerDatosUsuario();
  },
  methods: {
    async obtenerDatosUsuario() {
      this.cargando = true;
      try {
        this.payloadToken = await getPayloadToken();
        const respuesta = await api.obtenerUsuario(this.payloadToken._id);
        this.usuario = respuesta.data;
      } catch (error) {
        ElMessage.error({
          message: "Error al obtener datos del usuario",
        });
      }

      this.cargando = false;
    },
    cambiarContrasena() {
      this.$router.push("/perfil/cambiar-contrasena");
    },
    cerrarSesion() {
      localStorage.removeItem("jwt");
      this.$router.go("/login");
    },
    reportarProblema() {
      window.open(
        "mailto:sistemas.gruponacar@gmail.com?Subject=Problemas%20generales%20en%20sistema",
        "_blank"
      );
    },
  },
};
</script>
<style lang="scss">
._h-30 {
  min-height: 30vh;
}
._img {
  width: 200px;
  height: 200px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.5);
}
._hover {
  cursor: pointer;
  transition: 0.3s ease-in;
  &:hover {
    text-decoration: underline;
  }
}
@media screen and (min-width: 768px) {
  ._h-30 {
    min-height: 40vh;
  }
}
</style>
