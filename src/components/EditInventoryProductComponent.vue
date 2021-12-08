<template>
  <div class="_w-50 mx-auto">
    <AlertComponent />
    <form
      v-on:submit.prevent="
        editProductionProduct(productionProduct._id, productionProduct)
      "
      v-if="this.productionProduct._id"
      class="text-center"
    >
      <div class="form-group my-3">
        <label for="">ID: </label>
        <input
          type="text"
          class="form-control"
          placeholder="_id"
          readonly
          v-model="productionProduct._id"
        />
      </div>
      <div class="form-group my-3">
        <label for="">Nombre: </label>
        <input
          type="text"
          class="form-control"
          placeholder=""
          v-model="productionProduct.name"
        />
      </div>

      <div class="form-group my-3">
        <label for="">Stock: </label>
        <input
          type="number"
          class="form-control"
          min="0"
          step="1"
          placeholder=""
          v-model="productionProduct.stock"
        />
      </div>
      <div class="form-group my-3">
        <label for="description">Descripci&oacute;n: </label>
        <input
          type="text"
          class="form-control"
          placeholder=""
          name="description"
          v-model="productionProduct.description"
        />
      </div>
      <div class="form-group my-3">
        <label for="">Stock M&iacute;nimo: </label>
        <input
          type="number"
          class="form-control"
          placeholder=""
          min="0"
          step="1"
          v-model="productionProduct.min_stock"
        />
      </div>
      <div class="form-group my-3">
        <label for="">Costo: </label>
        <input
          type="number"
          class="form-control"
          placeholder=""
          min="0"
          step="0.01"
          v-model="productionProduct.cost"
        />
      </div>
      <div class="form-group my-3">
        <label for="">Disponibilidad</label>
        <select class="form-control" v-model="productionProduct.availability">
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>
      </div>
      <input type="submit" class="_btn _btn-primary" value="Editar Producto" />
    </form>
  </div>
</template>
<script>
import AlertComponent from "@/components/AlertComponent.vue";
import { mapState, mapMutations } from "vuex";
import api from "@/scripts/api.actions.js";
export default {
  components: { AlertComponent },
  data() {
    return {
      productionProduct: {},
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  mounted() {
    this.getProductionProduct();
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    async editProductionProduct(id, data) {
      try {
        const response = await api.editInventoryProduct(id, data);
        if (response.status === 200) {
          this.showNotification({
            data: {
              name: "Edicion de Producto",
              message: "El producto se ha editado correctamente",
            },
          });
          this.$router.push("/inventory/production-products");
        }
      } catch (error) {
        if (error.response) {
          this.showNotification(error.response);
        }
      }
    },
    async getProductionProduct() {
      try {
        const response = await api.getInventoryProductById(
          this.$route.params.id
        );
        this.productionProduct = response.data;
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
};
</script>
<style lang=""></style>
