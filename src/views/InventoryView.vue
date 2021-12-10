<template>
  <div class="_inventory container">
    <InventoryNavComponent />
    <router-view />
  </div>
</template>
<script>
import InventoryNavComponent from "@/components/Inventory/InventoryNavComponent.vue";
export default {
  components: {
    InventoryNavComponent,
  },
};
</script>
<style lang="scss"></style>
