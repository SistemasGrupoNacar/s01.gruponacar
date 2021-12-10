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
    <hr />
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
          <model-select
            :options="inventoryProducts"
            v-model="inventoryEntry.inventory_product"
            placeholder="Seleccione el producto para producción"
          >
          </model-select>
          <input
            type="date"
            class="_input _bg-black-1 w-100 my-2"
            v-model="inventoryEntry.date"
            min="2021-01-01"
            step="1"
            ref="dateInput"
          />
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
            class="_btn _btn-primary w-100 my-2 _text-white"
            value="Agregar"
          />
        </form>
        <hr />
        <h6 class="_text-bold">Eliminar entrada a inventario</h6>
        <form v-on:submit.prevent="deleteInventoryEntry(inventoryEntryDelete)">
          <model-select
            :options="inventoryEntryList"
            v-model="inventoryEntryDelete"
            placeholder="Seleccione la entrada a eliminar"
          >
          </model-select>
          <input type="submit" class="_btn w-100 my-2" value="Eliminar" />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/scripts/api.actions.js";
import AlertComponent from "@/components/AlertComponent.vue";
import { mapState, mapMutations } from "vuex";
import { ModelSelect } from "vue-search-select";
export default {
  components: {
    AlertComponent,
    ModelSelect,
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
      inventoryProducts: [],
      inventoryEntryDelete: "",
      inventoryEntryList: [],
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),

    updateAll() {
      this.getMinStockInventoryProducts();
      this.getInventoryEntries();
      this.getInventoryProducts();
    },

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
    async getInventoryProducts() {
      try {
        const response = await api.getInventoryProducts();
        this.inventoryProducts = response.data;
        // agregar propiedad value a cada iteme n inventoryProducts
        this.inventoryProducts.forEach((item) => {
          item.value = item._id;
        });
        // agregar propiedad text a cada iteme n inventoryProducts
        this.inventoryProducts.forEach((item) => {
          item.text = item.name;
        });
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

    async addInventoryEntry(data) {
      console.log(data);
      try {
        const response = await api.createInventoryEntry(data);
        if (response.status === 201) {
          this.showNotification({
            data: {
              name: "Inventario para Producción",
              message: "Entrada de inventario agregada correctamente",
            },
          });
          (this.inventoryEntry = {
            inventory_product: "",
            date: "",
            quantity: null,
            unit_price: null,
            total: null,
          }),
            this.updateAll();
        }
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },

    async getInventoryEntries() {
      try {
        const response = await api.getInventoryEntries();
        this.inventoryEntryList = response.data;
        // agregando el campo value a cada item en inventoryEntryList
        this.inventoryEntryList.forEach((item) => {
          item.value = item._id;
        });
        // agregando el campo text a cada item en inventoryEntryList
        this.inventoryEntryList.forEach((item) => {
          item.text =
            item._id +
            " - " +
            item.date.slice(0, 10) +
            " - " +
            item.inventory_product.name;
        });
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },
    async deleteInventoryEntry(data) {
      try {
        const response = await api.deleteInventoryEntry(data);
        if (response.status === 200) {
          this.showNotification({
            data: {
              name: "Inventario para Producción",
              message: "Entrada de inventario eliminada correctamente",
            },
          });
          this.inventoryEntryDelete = "";
          this.updateAll();
        }
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },
  },
  mounted() {
    this.getMinStockInventoryProducts();
    this.getInventoryProducts();
    this.getInventoryEntries();
    // seteando la fecha maxima a el dia de ahora
    this.$refs.dateInput.max = new Date().toISOString().split("T")[0];
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
