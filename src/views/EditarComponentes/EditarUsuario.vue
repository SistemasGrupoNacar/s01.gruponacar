<template>
  <el-main v-loading.fullscreen.lock="cargando">
    {{ usuario }}
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      id: this.$route.params.id,
      cargando: false,
      usuario: null,
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
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener el usuario");
        }
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
