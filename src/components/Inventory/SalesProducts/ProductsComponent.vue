<template>
  <div class="_products">
    <AlertComponent />
    <table class="table w-100 text-center my-2">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Stock</th>
          <th v-if="!isMobile" scope="col ">Descripci&oacute;n</th>
          <th>Disponibilidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <th scope="row">{{ item.name }}</th>
          <td>{{ item.stock }}</td>
          <td v-if="!isMobile">{{ item.description }}</td>
          <td>
            <span v-if="item.availability">Disponible</span>
            <span v-else>No disponible</span>
          </td>
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
      products: [],
      isMobile: false,
    };
  },
  computed: {
    ...mapState("response", ["response"]),
  },
  methods: {
    ...mapMutations("response", ["updateResponse"]),
    fetchProducts() {
      api.getProducts().then((response) => {
        this.updateResponse(response);
        this.products = response.data;
      });
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
    this.fetchProducts();
  },
};
</script>
<style lang="scss">
@import "./../../../assets/css/components/ProductsComponent.css";
</style>
