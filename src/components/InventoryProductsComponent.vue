<template>
  <div class="_inventory-products">
    <AlertComponent />

    <table class="table w-100 text-center my-2">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Stock</th>
          <th scope="col">Stock M&iacute;nimo</th>
          <th scope="col">Costo Unitario</th>
          <th v-if="!isMobile" scope="col ">Descripci&oacute;n</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in inventoryProducts" :key="index">
          <th scope="row">{{ item.name }}</th>
          <td>{{ item.stock }}</td>
          <td>{{ item.min_stock }}</td>
          <td>$ {{ item.cost }}</td>
          <td v-if="!isMobile">{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AlertComponent from "@/components/AlertComponent.vue";
import { mapState, mapMutations } from "vuex";
import api from "@/scripts/api.actions.js";
export default {
  components: {
    AlertComponent,
  },
  data() {
    return {
      inventoryProducts: [],
      isMobile: true,
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    async fetchInventoryProducts() {
      try {
        const response = await api.getInventoryProducts();
        this.inventoryProducts = response.data;
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },

    showNotification(content) {
      this.updateResponse({
        content,
        display: true,
      });
    },
  },
  mounted() {
    if (window.innerWidth >= 768) {
      this.isMobile = false;
    }
    this.fetchInventoryProducts();
  },
};
</script>
<style lang="scss">
@import "./../assets/css/components/InventoryProductsComponent.css";
</style>
