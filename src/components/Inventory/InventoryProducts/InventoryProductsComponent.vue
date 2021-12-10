<template>
  <div class="_inventory-products">
    <AlertComponent />

    <table class="table w-100 text-center my-2">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Existencia</th>
          <th v-if="!isMobile" scope="col">Existencia M&iacute;nima</th>
          <th v-if="!isMobile" scope="col">Costo Unitario</th>
          <th v-if="!isMobile" scope="col ">Descripci&oacute;n</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in inventoryProducts" :key="index">
          <th scope="row">{{ item.name }}</th>
          <td>{{ item.stock }}</td>
          <td v-if="!isMobile">{{ item.min_stock }}</td>
          <td v-if="!isMobile">$ {{ item.cost }}</td>
          <td v-if="!isMobile">{{ item.description }}</td>
          <td class="w-25">
            <button
              class="_btn my-lg-0 my-1 _w-50"
              @click="editProduct(item._id)"
            >
              Editar
            </button>
            <button
              class="_btn _btn-primary my-lg-0 my-1 _w-50"
              @click="deleteProduct(item._id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="_create _bg-primary _text-white text-center"
      v-on:click="goCreateInventoryProduct"
    >
      <i class="fas fa-plus"></i>
    </div>
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
  mounted() {
    if (window.innerWidth >= 768) {
      this.isMobile = false;
    }
    this.fetchInventoryProducts();
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

    goCreateInventoryProduct() {
      this.$router.push("/inventory/production-products/create");
    },

    showNotification(content) {
      this.updateResponse({
        content,
        display: true,
      });
    },
    editProduct(id) {
      this.$router.push({
        path: `/inventory/production-products/${id}/edit`,
        params: {
          id,
        },
      });
    },
    async deleteProduct(id) {
      let confirmDialog = confirm("¿Estás seguro de eliminar este producto?");
      if (confirmDialog) {
        try {
          await api.deleteInventoryProduct(id);
          this.showNotification({
            data: {
              name: "Eliminado",
              message: "El producto se eliminó correctamente",
            },
          });
          this.fetchInventoryProducts();
        } catch (error) {
          if (error.response) {
            this.showNotification(error.response);
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "./../../../assets/css/components/InventoryProductsComponent.css";

</style>
