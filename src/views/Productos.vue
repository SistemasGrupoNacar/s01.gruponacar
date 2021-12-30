<template>
  <el-button
    class="nuevo-producto"
    type="primary"
    v-on:click="nuevoIngresoProducto()"
    ><el-icon><Plus /> </el-icon>
  </el-button>

  <div class="container">
    <div class="row w-100">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">Listado de Productos</p>
        <el-table
          v-loading="cargandoDatosTablaProductos"
          :data="listadoProductos"
        >
          <el-table-column prop="_id" label="ID"> </el-table-column>
          <el-table-column prop="nombre" label="Nombre">
          </el-table-column> </el-table
        ><el-button class="my-2" size="small" v-on:click="nuevoProducto()"
          >Agregar Producto</el-button
        >
      </div>
      <div class="col-12 col-md-5 text-center my-3">
        <p class="_text-bigger text-center">Eliminaci&oacute;n de producto</p>
        <el-select
          v-model="select"
          placeholder="Seleccione producto a eliminar"
          clearable
          class="w-100"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button class="d-block mx-auto my-1">Eliminar</el-button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-3">
        <p class="_text-bigger text-center">Historial de Ingresos</p>
        <el-table
          v-loading="cargandoDatosTablaHistorial"
          :data="listadoProductos"
          class="w-100"
        >
          <el-table-column prop="_id" label="ID" class="w-auto">
          </el-table-column>
          <el-table-column prop="nombre" label="Nombre" class="w-auto">
          </el-table-column>
        </el-table>
        <el-button
          class="d-block mx-auto my-1"
          v-on:click="historialProductos()"
          >Mostrar todos</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
export default {
  components: {
    Plus,
  },
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
      cargandoDatosTablaHistorial: true,
      cargandoDatosTablaProductos: true,
      input: "",
      select: "",
      options: [
        {
          value: "0990328472034",
          label: "Producto 1",
        },
        {
          value: "0990328472038",
          label: "Producto 2",
        },
      ],
    };
  },

  methods: {
    nuevoIngresoProducto() {
      this.$router.push({
        name: "NuevoIngresoProducto",
      });
    },
    nuevoProducto() {
      this.$router.push({
        name: "NuevoProducto",
      });
    },
    historialProductos() {
      this.$router.push({
        name: "HistorialIngresoProducto",
      });
    },
  },
};
</script>
<style lang="scss">
.nuevo-producto {
  display: block;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
