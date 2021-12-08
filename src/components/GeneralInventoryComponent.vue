<template>
  <div class="_inventory-general">
    <div class="row">
      <div class="col-12 col-md-4">
          Estado de Inventario:
        <div v-if="alertProducts.lenght > 0">
          <p class="_text-bold">Productos con bajo stock</p>
          <span v-for="(item, index) in alertProducts" :key="index">{{
            item.name
          }}</span>
        </div>
        <span class="_text-bold" v-else>No existe carencia en inventario</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alertProducts: [],
    };
  },
};
</script>
<style lang="scss">
._inventory-general {
  padding: 1rem;
}
</style>
