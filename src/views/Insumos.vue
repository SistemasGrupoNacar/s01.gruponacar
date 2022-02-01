<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega un nuevo ingreso de insumos"
    placement="top"
  >
      <el-button
        class="nuevo-insumo"
        type="primary"
        v-on:click="nuevoIngresoInsumo()"
        ><el-icon><Plus /> </el-icon>
      </el-button>
  </el-tooltip>

  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">Listado de Insumos</p>
        <el-table
          v-loading="cargandoDatosTablaInsumos"
          :data="listadoPrimerosInsumos"
        >
          <el-table-column prop="_id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="Nombre"> </el-table-column>

          <el-table-column prop="stock" label="Stock" width="75">
          </el-table-column>
        </el-table>
        <el-button
          class="my-2"
          size="small"
          type="primary"
          v-on:click="nuevoInsumo()"
          >Agregar Insumo</el-button
        ><el-button type="" size="small" v-on:click="listadoInsumo()"
          >Mostrar todo
        </el-button>
      </div>
      <div class="col-12 col-md-5 text-center my-3">
        <p class="_text-bigger text-center">Eliminaci&oacute;n de insumo</p>
        <el-select
          v-model="idInsumoEliminar"
          placeholder="Seleccione insumo a eliminar"
          clearable
          class="w-100"
        >
          <el-option
            v-for="item in listadoTodoInsumos"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>

        <el-button
          class="d-block mx-auto my-1"
          v-on:click="eliminarInsumo(idInsumoEliminar)"
          >Eliminar</el-button
        >
      </div>
    </div>
    <div class="row">
      <div class="col-12 my-3">
        <p class="_text-bigger text-center">Historial de Ingresos</p>
        <el-table
          v-loading="cargandoDatosTablaHistorial"
          :data="listadoHistorialInsumos"
          class="w-100"
        >
          <el-table-column prop="_id" label="ID"> </el-table-column>
          <el-table-column prop="date" label="Fecha"> </el-table-column
          ><el-table-column
            prop="inventory_product.name"
            label="Nombre de Producto"
          >
          </el-table-column>
          <el-table-column prop="quantity" label="Cantidad (Sacos)">
          </el-table-column>
        </el-table>
        <el-button class="d-block mx-auto my-1" v-on:click="historialInsumos()"
          >Mostrar todos</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/index.js";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      cargandoDatosTablaInsumos: true,
      cargandoDatosTablaHistorial: true,
      listadoTodoInsumos: [],
      listadoPrimerosInsumos: [],
      listadoHistorialInsumos: [],
      idInsumoEliminar: "",
    };
  },
  mounted() {
    this.actualizarTodo();
  },
  methods: {
    actualizarTodo() {
      this.obtenerTodosInsumos();
      this.obtenerPrimerosInsumos();
      this.obtenerPrimerosHistorialEntradaInsumos();
    },
    async obtenerPrimerosInsumos() {
      try {
        this.cargandoDatosTablaInsumos = true;
        const respuesta = await api.obtenerPrimerosInsumos();
        this.listadoPrimerosInsumos = respuesta.data;
        this.cargandoDatosTablaInsumos = false;
      } catch (e) {
        console.log(e);
      }
    },
    async obtenerTodosInsumos() {
      try {
        const respuesta = await api.obtenerTodosInsumos();
        this.listadoTodoInsumos = respuesta.data;
      } catch (e) {
        console.log(e);
      }
    },
    async obtenerPrimerosHistorialEntradaInsumos() {
      try {
        this.cargandoDatosTablaHistorial = true;
        const respuesta = await api.obtenerPrimerosHistorialEntradaInsumos();
        this.listadoHistorialInsumos = respuesta.data;
        // Recortando la hora en las fechas
        this.listadoHistorialInsumos.map((item) => {
          item.date = item.date.split("T")[0];
        });
        this.cargandoDatosTablaHistorial = false;
      } catch (e) {
        console.log(e);
      }
    },
    async eliminarInsumo(data) {
      let confirmacion = confirm("¿Esta seguro de eliminar este insumo?");
      if (confirmacion) {
        try {
          const respuesta = await api.eliminarInsumo(data);
          alert("Eliminado el insumo " + respuesta.data.name);
          this.idInsumoEliminar = "";
          this.actualizarTodo();
        } catch (error) {
          console.log(error);
        }
      }
    },
    nuevoIngresoInsumo() {
      this.$router.push({
        name: "NuevoIngresoInsumo",
      });
    },
    nuevoInsumo() {
      this.$router.push({
        name: "NuevoInsumo",
      });
    },
    listadoInsumo() {
      this.$router.push({
        name: "ListadoInsumos",
      });
    },
    historialInsumos() {
      this.$router.push({
        name: "HistorialIngresoInsumo",
      });
    },
  },
};
</script>
<style lang="scss">
.nuevo-insumo {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>
