<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-5">
        <p class="_text-bigger text-center">Creaci&oacute;n</p>
        <form v-on:submit.prevent="handle">
          <input type="text" class="" />
        </form>
      </div>
      <div class="col-12 col-md-7">
        <p class="_text-bigger text-center">Eliminaci&oacute;n</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="_text-bigger text-center">Listado de productos</p>
        <div v-for="(item, index) in listadoProductos" :key="index">
          {{ `${item._id} - - - ${item.nombre}` }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listadoProductos: [
        {
          _id: "0990328472034",
          nombre: "Producto 1",
        },
        {
          _id: "0990328472034",
          nombre: "Producto 2",
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
