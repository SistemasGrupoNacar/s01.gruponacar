<template>
  <div class="_inventory-general">
    <AlertComponent />
    <div class="row my-2">
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
    <hr>
    <div class="row my-2">
      <div class="col-12 col-md-6 my-4 my-lg-0">
        <h6 class="_text-bold">Agregar cosecha</h6>
      </div>
      <div class="col-12 col-md-6 my-4 my-md-0">
        <h6 class="_text-bold">Agregar entrada a inventario</h6>
        <form
          class="w-100"
          v-on:submit.prevent="addInventoryEntry(inventoryEntry)"
        >
          <select name="" id="" class="_input w-100 my-2">
            <option value="">1</option>
          </select>
          <input
            type="number"
            v-model="inventoryEntry.quantity"
            placeholder="Cantidad"
            class="_input _bg-black-1 w-100 my-2"
            step="1"
            min="1"
          />
          <div class="form-group _form-join">
            <input
              type="number"
              v-model="inventoryEntry.unit_price"
              placeholder="Precio"
              class="_input _bg-black-1 my-2"
              step="0.01"
              min="0"
            />
            <input
              type="number"
              v-model="inventoryEntry.total"
              placeholder="Total"
              class="_input _bg-black-1 my-2"
              step="0.01"
              min="0"
            />
          </div>

          <input
            type="submit"
            class="_btn _btn-primary w-100 my-2"
            value="Agregar"
          />
        </form>
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
      inventoryEntry: {
        inventory_product: "",
        date: "",
        quantity: null,
        unit_price: null,
        total: null,
      },
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

    addInventoryEntry(data) {
      console.log(data);
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

._form-join {
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    width: 100% !important;
  }
}

//media query desktop
@media (min-width: 992px) {
  ._form-join {
    input {
      width: calc(50% - 1rem) !important;
    }
  }
}
</style>
