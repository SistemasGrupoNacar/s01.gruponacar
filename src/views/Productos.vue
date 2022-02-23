<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega una nueva cosecha de productos"
    placement="top"
  >
    <el-button
      class="nuevo-producto"
      type="primary"
      v-on:click="nuevoIngresoProducto()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>

  <div class="container">
    <div class="row w-100">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">Listado de Productos</p>
        <el-table
          v-loading.fullscreen.lock="cargandoDatosTablaProductos"
          :data="listadoPrimerosProductos"
        >
          <el-table-column prop="_id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="Nombre"> </el-table-column
          ><el-table-column prop="stock" label="Stock" width="75">
          </el-table-column> </el-table
        ><el-button
          class="my-2"
          size="small"
          type="primary"
          v-on:click="nuevoProducto()"
          >Agregar Producto</el-button
        ><el-button type="" size="small" v-on:click="listadoProducto()"
          >Mostrar todo
        </el-button>
      </div>
      <div class="col-12 col-md-5 text-center my-3">
        <p class="_text-bigger text-center">Eliminaci&oacute;n de producto</p>
        <el-select
          v-model="idProductoEliminar"
          placeholder="Seleccione producto a eliminar"
          clearable
          filterable
          class="w-100"
        >
          <el-option
            v-for="item in listadoTodosProductos"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-button
          class="d-block mx-auto my-1"
          v-on:click="eliminarProducto(idProductoEliminar)"
          >Eliminar</el-button
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-3">
        <p class="_text-bigger text-center">Historial de Ingresos</p>
        <el-table
          v-loading.fullscreen.lock="cargandoDatosTablaHistorial"
          :data="listadoHistorialCosecha"
          class="w-100"
          ><el-table-column prop="_id" label="ID"> </el-table-column>
          <el-table-column prop="date" label="Fecha"> </el-table-column
          ><el-table-column prop="product.name" label="Nombre de Producto">
          </el-table-column>
          <el-table-column prop="quantity" label="Cantidad (Sacos)">
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
import api from "@/api/index.js";
import { verificarSesion } from "@/scripts/Sesion.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      listadoPrimerosProductos: [],
      listadoTodosProductos: [],
      listadoHistorialCosecha: [],
      cargandoDatosTablaHistorial: true,
      cargandoDatosTablaProductos: true,
      input: "",
      idProductoEliminar: "",
    };
  },
  mounted() {
    this.obtenerPrimerosProductos();
    this.obtenerTodosProductos();
    this.obtenerPrimerosHistorialCosecha();
  },

  methods: {
    async actualizarTodo() {
      this.obtenerPrimerosProductos();
      this.obtenerTodosProductos();
      this.obtenerPrimerosHistorialCosecha();
    },

    async obtenerPrimerosHistorialCosecha() {
      this.cargandoDatosTablaHistorial = true;
      try {
        const respuesta = await api.obtenerPrimerosHistorialCosecha();
        this.listadoHistorialCosecha = respuesta.data;
        // Recortando la hora en las fechas
        this.listadoHistorialCosecha.map((item) => {
          item.date = item.date.split("T")[0];
        });
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargandoDatosTablaHistorial = false;
    },
    async obtenerPrimerosProductos() {
      this.cargandoDatosTablaProductos = true;
      try {
        const respuesta = await api.obtenerPrimerosProductos();
        this.listadoPrimerosProductos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargandoDatosTablaProductos = false;
    },
    nuevoIngresoProducto() {
      this.$router.push({
        name: "NuevoIngresoProducto",
      });
    },
    listadoProducto() {
      this.$router.push({
        name: "ListadoProductos",
      });
    },
    async obtenerTodosProductos() {
      try {
        const respuesta = await api.obtenerTodosProductos();
        this.listadoTodosProductos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
    },
    async eliminarProducto(data) {
      let confirmacion = confirm("¿Esta seguro de eliminar este producto?");
      if (confirmacion) {
        try {
          const respuesta = await api.eliminarProducto(data);
          alert("Eliminado el producto " + respuesta.data.name);
          this.idProductoEliminar = "";
          this.actualizarTodo();
        } catch (error) {
          if (error.response) {
            verificarSesion(error);
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error("Error al eliminar el producto");
          }
        }
      }
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
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>
