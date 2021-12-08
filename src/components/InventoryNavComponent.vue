<template>
  <div class="_navbar-inventory">
    <router-link class="item-nav" :class="generalRouteName" to="/inventory/"
      >Info General</router-link
    >
    <router-link
      class="item-nav"
      :class="productionRouteName"
      to="/inventory/production"
      >Producci&oacute;n</router-link
    >
    <router-link class="item-nav" :class="salesRouteName" to="/inventory/sales"
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
        _active: this.$route.name == "InventoryProduction",
      };
    },
    salesRouteName() {
      return {
        _active: this.$route.name == "InventorySales",
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
