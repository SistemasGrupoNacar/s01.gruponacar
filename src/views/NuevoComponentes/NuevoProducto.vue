<template>
  <div class="container">
    <p class="_title">Nuevo producto</p>
    <p class="_subtitle">Creaci&oacute;n de nuevo producto para ventas</p>
    <div class="row">
      <div class="col-12 col-md-6">
        <form class="_w-100 my-2">
          <span class="text-muted">Nombre</span>
          <el-input
            v-model="product.name"
            class="w-100 my-2"
            placeholder="Ingrese nombre del producto"
          />
          <span class="text-muted">Descripci&oacute;n</span>
          <el-input
            v-model="product.description"
            :rows="5"
            type="textarea"
            class="w-100 my-2"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="Ingrese descripcion del producto"
          />
          <span class="text-muted">Disponibilidad</span>
          <el-select
            v-model="product.availability"
            placeholder="Seleccione la disponibilidad"
            class="w-100 my-2"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </form>
      </div>
      <div class="col-12 col-md-6 _only-tablet p-5">
        <p class="_title" v-show="product.name != ''">
          {{ product.name }}
        </p>
        <p class="_subtitle" v-show="product.description != ''">
          {{ product.description }}
        </p>
        <p class="_subtitle" v-show="product.availability != null">
          Disponibilidad:
          <span v-if="product.availability">Si</span> <span v-else>No</span>
        </p>
      </div>
      <el-button
        class="d-block mx-auto my-1 w-50"
        v-on:click="crearProducto(product)"
        >Agregar Producto</el-button
      >
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      product: {
        name: "",
        description: "",
        availability: null,
      },
      options: {
        true: {
          label: "Disponible",
          value: true,
        },
        false: {
          label: "No disponible",
          value: false,
        },
      },
    };
  },
  methods: {
    async crearProducto(data) {
      if (!this.verificarDatos(data)) {
        alert("Data incorrecta");
        return;
      }
      try {
        const respuesta = await api.crearProducto(data);
        alert("Producto creado: " + respuesta.data.name);
        this.$router.push({ name: "Productos" });
      } catch (e) {
        console.log(e);
      }
    },
    verificarDatos(data) {
      if (data.name == "") {
        return false;
      }
      if (data.availability == null) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss"></style>
