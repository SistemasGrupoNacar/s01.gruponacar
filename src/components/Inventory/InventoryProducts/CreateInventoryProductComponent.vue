<template>
  <div class="">
    <h4 class="py-3">Agregar a Inventario Producto para Producci&oacute;n</h4>
    <AlertComponent />
    <form
      v-on:submit.prevent="createProductionProduct(productionProduct)"
      class="text-center _w-35 mx-auto"
    >
      <div class="form-group my-3">
        <label for="">Nombre del producto: </label>
        <input
          type="text"
          class="form-control"
          placeholder=""
          v-model="productionProduct.name"
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
      <input type="submit" class="_btn _btn-primary" value="Crear Producto" />
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
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    async createProductionProduct(data) {
      //validate all the fields
      if (
        !data.name ||
        !data.description ||
        !data.min_stock ||
        !data.cost ||
        !data.availability
      ) {
        this.showNotification({
          data: {
            name: "Campos vacios",
            message: "Por favor llene todos los campos",
          },
        });
      } else {
        try {
          const response = await api.createInventoryProduct(data);
          console.log(response);
          if (response.status == 201) {
            this.showNotification({
              data: {
                name: "Producto creado",
                message: "El producto se ha creado correctamente",
              },
            });
            this.$router.push("/inventory/production-products");
          }
        } catch (error) {
          if (error.response) {
            this.showNotification(error.response);
          }
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
