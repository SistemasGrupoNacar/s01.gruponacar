<template>
  <div class="container">
    <p class="_title">Historial Insumos</p>
    <p class="_subtitle text-muted">
      Listado de ingresos de insumos al sistema.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50"></div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cargando: true,
    };
  },
};
</script>
<style lang="scss">
.min-h-50 {
  min-height: 50vh;
}
</style>
