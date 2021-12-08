<template>
  <div class="_navbar-inventory">
    <router-link class="item-nav" :class="generalRouteName" to="/inventory/"
      >Info General</router-link
    >
    <router-link
      class="item-nav"
      :class="productionRouteName"
      to="/inventory/production-products"
      >Producci&oacute;n</router-link
    >
    <router-link class="item-nav" :class="salesRouteName" to="/inventory/sales-products"
      >Ventas</router-link
    >
  </div>
</template>
<script>
export default {
  computed: {
    generalRouteName() {
      return {
        _active: this.$route.name == "InventoryGeneral",
      };
    },
    productionRouteName() {
      return {
        _active: this.$route.name == "InventoryProductionProducts",
      };
    },
    salesRouteName() {
      return {
        _active: this.$route.name == "InventorySalesProducts",
      };
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/css/components/InventoryNavComponent.css";

._active {
  color: var(--secondary) !important;
}
</style>
