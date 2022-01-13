<template>
  <div>Egresos</div>
  <el-main v-loading="cargando">
    <area-chart empty="No hay datos" :data="egresos" width="500px"></area-chart
  ></el-main>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      egresos: {},
      cargando: false,
    };
  },
  mounted() {
    this.obtenerEgresos();
  },
  methods: {
    async obtenerEgresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerEgresos();
        this.egresos = respuesta.data;
        // Formateando las fechas
        this.egresos.forEach((egreso) => {
          egreso[0] = new Date(egreso[0]).toLocaleDateString();

          console.log(egreso[0]);
        });
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
