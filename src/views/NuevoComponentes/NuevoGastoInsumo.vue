<template>
  <el-page-header
    class="my-3"
    content="Agregar gasto de insumo"
    @back="irInsumos()"
  />
  <hr />
  <el-main class="container" v-loading.fullscreen.lock="cargando">
    <div class="row">
      <div class="col-12 col-md-4 my-2">
        <span class="text-muted">Insumo</span>
        <el-select
          v-model="nuevoGastoInsumo.inventory_product"
          placeholder="Seleccione insumo"
          class="w-100"
          filterable
        >
          <el-option
            v-for="item in listadoInsumos"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="col-6 col-md-3 my-2">
        <span class="text-muted">Fecha</span>
        <el-date-picker
          v-model="nuevoGastoInsumo.date"
          type="datetime"
          placeholder="Escoge una fecha"
          class="w-100"
          clearable
        >
        </el-date-picker>
      </div>
      <div class="col-6 col-md-2 my-2">
        <span class="text-muted"
          >Cantidad ({{ findUnitOfMeasurement(nuevoGastoInsumo) }})</span
        >
        <el-input-number
          v-model="nuevoGastoInsumo.quantity"
          :min="0.01"
          :max="999999"
          :step="0.01"
          class="w-100"
        >
        </el-input-number>
      </div>
      <div class="col-12 col-md-3 my-2">
        <span class="text-muted">Observaciones</span>
        <el-input
          v-model="nuevoGastoInsumo.description"
          placeholder="Ingrese las observaciones"
          clearable
        />
      </div>

      <el-button
        class="d-block mx-auto my-2 w-50"
        v-on:click.prevent="agregarGastoInsumo(nuevoGastoInsumo)"
      >
        Agregar Gasto</el-button
      >
    </div>
  </el-main>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      listadoInsumos: [],
      cargando: false,
      nuevoGastoInsumo: {
        inventory_product: null,
        description: null,
        date: null,
        quantity: 0.01,
      },
    };
  },
  mounted() {
    this.obtenerInsumos();
  },
  methods: {
    findUnitOfMeasurement(item) {
      if (item) {
        const insumo = this.listadoInsumos.find(
          (element) => element._id == item.inventory_product
        );
        if (insumo) {
          return insumo.unit_of_measurement;
        }
        return;
      }
    },
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
    async obtenerInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerInsumos();
        this.listadoInsumos = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos");
        }
      }
      this.cargando = false;
    },
    validarDatos(datos) {
      if (
        datos.inventory_product === null ||
        datos.date === null ||
        datos.quantity <= 0
      ) {
        return false;
      }
      return true;
    },
    async agregarGastoInsumo(datos) {
      if (this.validarDatos(datos)) {
        try {
          await api.crearCostoProduccion(datos);
          ElMessage.success({
            message: "Gasto de insumo agregado correctamente",
          });
          this.$router.push("/inventario/insumos");
        } catch (error) {
          if (error.response) {
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error("Error al agregar el gasto de insumo");
          }
        }
      } else {
        ElMessage.warning({
          message: "Debe completar todos los campos",
        });
      }
    },
  },
};
</script>
<style lang="scss"></style>
