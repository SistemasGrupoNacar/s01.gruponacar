<template>
  <el-button class="nueva-venta" type="primary" v-on:click="nuevaVenta()"
    ><el-icon><Plus /> </el-icon>
  </el-button>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 my-3">Ventas En Progreso</div>
      <div class="col-12 col-md-5 my-3">Ventas Asd</div>
      <div class="col-12 my-3">Historial de ventas</div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    Plus,
  },
  methods: {
    nuevaVenta() {
      this.$router.push("/producciones/ventas/nueva");
    },
  },
};
</script>
<style lang="scss">
.nueva-venta {
  display: block;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
