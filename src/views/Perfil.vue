<template>
  <span class="_btn _bottom _right _ajustes">
    <div class="_btn-actions text-start">
      <p class="my-1 _text-small" v-on:click.prevent="cambiarContrasena()">
        Cambiar contrase&ntilde;a
      </p>
      <p class="my-1 _text-small" v-on:click.prevent="reportarProblema()">
        Reportar un problema
      </p>
    </div>
    <img
      :src="require('@/assets/illustrations/flecha-arriba.svg')"
      alt="Opciones"
    />
  </span>
  <el-main v-loading="cargando" class="min-h-50">
    <div
      class="w-100 _h-30 px-3 py-2 d-flex flex-column flex-md-row justify-content-center align-items-center"
    >
      <div class="mx-0 mx-md-3 my-3 my-md-0">
        <img
          :src="require('@/assets/illustrations/chico.svg')"
          alt="Imagen de referencia de perfil"
          class="rounded-circle mx-auto d-block _img _bg-dark"
        />
      </div>
      <div
        class="mx-0 mx-lg-3 my-3 my-md-0 text-start _w-40"
        v-if="usuario != null"
      >
        <p class="_bold _letter-spacing-1 _text-bigger my-0">
          {{ usuario.firstName }}
        </p>
        <p class="mx-4 my-0 _text-big">{{ usuario.lastName }}</p>
        <hr />
        <p class="mx-4 my-1 text-muted">DUI: {{ usuario.dui }}</p>
        <p class="mx-4 my-1 _bold">Tel&eacute;fono: {{ usuario.phone }}</p>
        <p class="mx-4 my-1 text-muted">Id: {{ usuario._id }}</p>
        <hr />
        <el-button class="w-100" v-on:click.prevent="cerrarSesion()"
          >Cerrar Sesion</el-button
        >
      </div>
    </div>
  </el-main>
</template>
<script>
import { getPayloadToken } from "@/scripts/Token.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
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
        this.usuario = await getPayloadToken();
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
@media screen and (min-width: 768px) {
  ._h-30 {
    min-height: 40vh;
  }
}
</style>
