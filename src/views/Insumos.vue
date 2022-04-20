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
          <el-table-column prop="name" label="Nombre" min-width="200">
          </el-table-column>

          <el-table-column prop="stock" label="Stock" width="75">
          </el-table-column>
          <el-table-column prop="unit_of_measurement" label="Medida" width="75">
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
        <p class="_text-bigger text-center">
          Gastos de insumos en producci&oacute;n
        </p>
        <el-table
          v-loading="cargandoDatosTablaGastos"
          :data="listadoCostosProduccion"
        >
          <el-table-column
            prop="inventory_product.name"
            label="Insumo"
            min-width="180"
          >
          </el-table-column>
          <el-table-column prop="date_format" label="Fecha" width="180">
          </el-table-column>
          <el-table-column prop="quantity" label="Cant." width="75">
          </el-table-column>
        </el-table>
        <el-button
          class="my-2"
          size="small"
          type="primary"
          v-on:click="nuevoGastoInsumo()"
          >Agregar gasto de insumo</el-button
        ><el-button type="" size="small" v-on:click="listadoGastoInsumo()"
          >Mostrar todo
        </el-button>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-12 my-3">
        <p class="_text-bigger text-center">Historial de Ingresos</p>
        <el-table
          v-loading="cargandoDatosTablaHistorial"
          :data="listadoHistorialInsumos"
          class="w-100"
        >
          <el-table-column prop="date_format" label="Fecha" width="180">
          </el-table-column
          ><el-table-column
            prop="inventory_product.name"
            label="Nombre de Producto"
            min-width="220"
          ></el-table-column
          ><el-table-column
            prop="inventory_product.unit_of_measurement"
            label="Medida"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="quantity" label="Cantidad" width="120">
          </el-table-column>
          <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
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
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      cargandoDatosTablaInsumos: false,
      cargandoDatosTablaHistorial: false,
      cargandoDatosTablaGastos: false,
      listadoTodoInsumos: [],
      listadoPrimerosInsumos: [],
      listadoHistorialInsumos: [],
      listadoCostosProduccion: [],
    };
  },
  mounted() {
    this.actualizarTodo();
  },
  methods: {
    actualizarTodo() {
      this.obtenerPrimerosInsumos();
      this.obtenerPrimerosHistorialEntradaInsumos();
      this.obtenerUltimosCostosProduccion();
    },
    async obtenerPrimerosInsumos() {
      this.cargandoDatosTablaInsumos = true;
      try {
        this.cargandoDatosTablaInsumos = true;
        const respuesta = await api.obtenerPrimerosInsumos();
        this.listadoPrimerosInsumos = respuesta.data;
        this.cargandoDatosTablaInsumos = false;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos");
        }
      }
      this.cargandoDatosTablaInsumos = false;
    },
    async obtenerPrimerosHistorialEntradaInsumos() {
      this.cargandoDatosTablaHistorial = true;
      try {
        this.cargandoDatosTablaHistorial = true;
        const respuesta = await api.obtenerPrimerosHistorialEntradaInsumos();
        this.listadoHistorialInsumos = respuesta.data;
        this.cargandoDatosTablaHistorial = false;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos");
        }
      }
      this.cargandoDatosTablaHistorial = false;
    },
    async obtenerUltimosCostosProduccion() {
      this.cargandoDatosTablaGastos = true;
      try {
        const respuesta = await api.obtenerUltimosCostosProduccion();
        this.listadoCostosProduccion = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos");
        }
      }
      this.cargandoDatosTablaGastos = false;
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
    listadoGastoInsumo() {
      this.$router.push({
        name: "ListadoGastosInsumos",
      });
    },
    nuevoGastoInsumo() {
      this.$router.push({
        name: "NuevoGastoInsumo",
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
