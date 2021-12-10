<template>
  <div class="">
    <AlertComponent />
    <h4 class="py-3">Editar Producto para Producci&oacute;n</h4>
    <form
      v-on:submit.prevent="
        editProductionProduct(productionProduct._id, productionProduct)
      "
      v-if="this.productionProduct._id"
      class="text-center _w-50 mx-auto"
    >
      <div class="_form-group my-3">
        <label for="" class="text-start _text-bold">ID: </label>
        <input
          type="text"
          class="_input  _wi-50"
          placeholder="_id"
          readonly
          v-model="productionProduct._id"
        />
      </div>
      <div class="_form-group my-3">
        <label for="" class="text-start _text-bold"
          >Nombre del producto:
        </label>
        <input
          type="text"
          class="_input _wi-50"
          placeholder=""
          v-model="productionProduct.name"
        />
      </div>
      <div class="_form-group my-3">
        <label for="description" class="text-start _text-bold"
          >Descripci&oacute;n:
        </label>
        <textarea
          type="text"
          class="_input  _textarea _wi-50"
          placeholder=""
          name="description"
          autocapitalize="sentences"
          autocomplete="off"
          rows="3"
          maxlength="200"
          v-model="productionProduct.description"
        />
      </div>
      <div class="_form-group my-3">
        <label for="" class="text-start _text-bold">Stock M&iacute;nimo: </label>
        <input
          type="number"
          class="_input _wi-50"
          placeholder=""
          min="0"
          step="1"
          v-model="productionProduct.min_stock"
        />
      </div>
      <div class="_form-group my-3">
        <label for="" class="_text-bold text-start">Costo: </label>
        <input
          type="number"
          class="_input _wi-50"
          placeholder=""
          min="0"
          step="0.01"
          v-model="productionProduct.cost"
        />
      </div>
      <div class="_form-group my-3">
        <label for="" class="text-start _text-bold">Disponibilidad</label>
        <select class="_input _wi-50" v-model="productionProduct.availability">
          <option value="true">Disponible</option>
          <option value="false">No Disponible</option>
        </select>
      </div>
      <button type="submit" class="_btn _btn-primary">Editar Producto</button>
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
<style lang="scss"></style>
