<template>
  <div class="_inventory-general">
    <AlertComponent />
    <div class="row">
      <div class="col-12 col-md-4">
        <div v-if="alertProducts.length > 0">
          <p class="_text-bold">Productos con bajo stock</p>
          <li v-for="(item, index) in alertProducts" :key="index">
            <span>{{ item.name }} - </span>
            <span>Desfase: {{ item.min_stock - item.stock }}</span>
          </li>
        </div>
        <p v-else>
          Estado de Inventario:<span class="_text-bold"
            >No existe carencia en inventario</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/scripts/api.actions.js";
import AlertComponent from "@/components/AlertComponent.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    AlertComponent,
  },
  data() {
    return {
      alertProducts: [],
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    async getMinStockInventoryProducts() {
      try {
        const response = await api.getProductsWithMinStock();
        this.alertProducts = response.data;
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
    this.getMinStockInventoryProducts();
  },
};
</script>
<style lang="scss">
._inventory-general {
  padding: 1rem;
}
</style>
