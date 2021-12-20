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
        <div
          v-show="!addHarvestSwitch"
          class="_btn _bg-secondary _text-white my-2 text-center _w-50"
          v-on:click="changeAddHarvestSwitchState"
        >
          Abrir Formulario
        </div>
        <form
          class="w-100"
          v-on:submit.prevent="addHarvest(harvest)"
          v-show="addHarvestSwitch"
        >
          <label class="_text-bold _text-small">Producto </label>
          <model-select
            :options="products"
            v-model="harvest.product"
            placeholder="Seleccione el producto"
            class="my-2"
          >
          </model-select>
          <label class="_text-bold _text-small">Producci&oacute;n </label>
          <model-select
            :options="productions"
            v-model="harvest.production"
            placeholder="Seleccione la producción"
            class="my-2"
          >
          </model-select>

          <label class="_text-bold _text-small">Descripci&oacute;n </label>
          <input
            type="text"
            class="_input _bg-black-1 w-100 my-2"
            placeholder="Ingrese descripción"
            v-model="harvest.description"
          />
          <div class="row">
            <div class="col-12 col-md-6">
              <label class="_text-bold _text-small">Cantidad </label>
              <input
                type="number"
                v-model="harvest.quantity"
                placeholder="Cantidad"
                class="_input _bg-black-1 w-100 my-2"
                step="1"
                min="1"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="_text-bold _text-small">Fecha </label>
              <input
                type="date"
                class="_input _bg-black-1 w-100 my-2"
                v-model="harvest.date"
                min="2021-01-01"
                step="1"
                ref="dateInputHarvest"
              />
            </div>
            <input
              type="submit"
              class="_btn _btn-primary w-100 my-2 _text-white"
              value="Agregar"
            />
          </div>
        </form>

        <hr />
        <h6 class="_text-bold">Eliminar cosecha</h6>
        <form v-on:submit.prevent="deleteHarvest(harvestDelete)">
          <model-select
            :options="harvestList"
            v-model="harvestDelete"
            placeholder="Seleccione la cosecha a eliminar"
          >
          </model-select>
          <input type="submit" class="_btn my-2 _w-50" value="Eliminar" />
        </form>
      </div>
      <div class="col-12 col-md-6 my-4 my-lg-0">
        <h6 class="_text-bold">Agregar entrada a inventario</h6>
        <div
          v-show="!addInventoryEntrySwitch"
          class="_btn _bg-secondary _text-white my-2 _w-50 text-center"
          v-on:click="changeAddInventoryEntrySwitchState"
        >
          Abrir Formulario
        </div>
        <form
          class="w-100"
          v-on:submit.prevent="addInventoryEntry(inventoryEntry)"
          v-show="addInventoryEntrySwitch"
        >
          <label class="_text-bold _text-small">Producto </label>
          <model-select
            :options="inventoryProducts"
            v-model="inventoryEntry.inventory_product"
            placeholder="Seleccione el producto para producción"
            class="my-2"
          >
          </model-select>
          <label class="_text-bold _text-small">Fecha </label>
          <input
            type="date"
            class="_input _bg-black-1 w-100 my-2"
            v-model="inventoryEntry.date"
            min="2021-01-01"
            step="1"
            ref="dateInput"
          />
          <label class="_text-bold _text-small">Cantidad </label>
          <input
            type="number"
            v-model="inventoryEntry.quantity"
            placeholder="Ingrese cantidad"
            class="_input _bg-black-1 w-100 my-2"
            step="1"
            min="1"
          />
          <div class="row">
            <div class="col-12 col-md-6">
              <label class="_text-bold _text-small">Precio Unitario </label>
              <input
                type="number"
                v-model="inventoryEntry.unit_price"
                placeholder="Ingrese precio"
                class="_input _bg-black-1 my-2 w-100"
                step="0.01"
                min="0"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="_text-bold _text-small">Total </label>
              <input
                type="number"
                v-model="inventoryEntry.total"
                placeholder="Ingrese total"
                class="_input _bg-black-1 my-2 w-100"
                step="0.01"
                min="0"
              />
            </div>
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
          <input type="submit" class="_btn _w-50 my-2" value="Eliminar" />
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
      addHarvestSwitch: false,
      addInventoryEntrySwitch: false,
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
      harvestDelete: "",
      inventoryEntryList: [],
      harvestList: [],
      harvest: {
        product: "",
        production: "",
        description: "",
        quantity: null,
        date: "",
      },
      products: [],
      productions: [],
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
      this.getHarvests();
      this.getProducts();
      this.getProductions();
    },

    changeAddHarvestSwitchState() {
      this.addHarvestSwitch = !this.addHarvestSwitch;
    },
    changeAddInventoryEntrySwitchState() {
      this.addInventoryEntrySwitch = !this.addInventoryEntrySwitch;
    },

    async getHarvests() {
      try {
        const response = await api.getHarvests();
        this.harvestList = response.data;
        // agregar propiedad value a cada item en harvestList
        this.harvestList.forEach((harvest) => {
          harvest.value = harvest._id;
        });
        // agregar propiedad text a cada item en harvestList
        this.harvestList.forEach((harvest) => {
          harvest.text =
            harvest.date.slice(0, 10) +
            " - " +
            harvest.product.name +
            " - " +
            harvest.quantity +
            " sacos";
        });
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
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

    async getProducts() {
      try {
        const response = await api.getProducts();
        this.products = response.data;
        // agregar propiedad value a cada iteme n products
        this.products.forEach((item) => {
          item.value = item._id;
        });
        // agregar propiedad text a cada iteme n products
        this.products.forEach((item) => {
          item.text = item.name;
        });
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },

    async getProductions() {
      try {
        const response = await api.getProductions();
        this.productions = response.data;
        // agregar propiedad value a cada iteme n productions
        this.productions.forEach((item) => {
          item.value = item._id;
          item.text =
            item._id +
            " - " +
            item.description +
            " - " +
            item.start_date.slice(0, 10);
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
          this.changeAddInventoryEntrySwitchState();
        }
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },

    async addHarvest(data) {
      try {
        const response = await api.createHarvest(data);
        if (response.status === 201) {
          this.showNotification({
            data: {
              name: "Cosecha",
              message: "Cosecha agregada correctamente",
            },
          });
          (this.harvest = {
            product: "",
            production: "",
            description: "",
            quantity: null,
            date: "",
          }),
            this.updateAll();
          this.changeAddHarvestSwitchState();
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
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
    async deleteHarvest(data) {
      try {
        const response = await api.deleteHarvest(data);
        if (response.status === 200) {
          this.showNotification({
            data: {
              name: "Cosecha",
              message: "Cosecha eliminada correctamente",
            },
          });
          this.harvestDelete = "";
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
    this.getProducts();
    this.getHarvests();
    this.getProductions();
    this.getInventoryEntries();
    // seteando la fecha maxima a el dia de ahora
    this.$refs.dateInput.max = new Date().toISOString().split("T")[0];
    this.$refs.dateInputHarvest.max = new Date().toISOString().split("T")[0];
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
