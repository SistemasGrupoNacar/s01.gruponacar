<template>
  <el-page-header
    class="my-3"
    content="Agregar ingreso de insumos"
    @back="irInsumos()"
  />
  <hr />
  <div class="container">
    <p class="_title">Nuevo Ingreso de Insumos</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el ingreso de nueva mercader&iacute;a de
      insumo.
    </p>
    <el-main v-loading.fullscreen.lock="cargando" class="my-2">
      <div class="row">
        <div class="col-12 col-md-5 my-2 my-lg-0">
          <span class="text-muted">Insumo</span>
          <el-select
            v-model="nuevoIngresoInsumo.inventory_product"
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
        <div class="col-12 col-md-4 my-2 my-lg-0">
          <span class="text-muted">Fecha</span>
          <el-date-picker
            v-model="nuevoIngresoInsumo.date"
            type="datetime"
            placeholder="Escoge una fecha"
            class="w-100"
            clearable
          >
          </el-date-picker>
        </div>
        <div class="col-12 col-md-3 my-2 my-lg-0">
          <span class="text-muted"
            >Cantidad ({{ findUnitOfMeasurement(nuevoIngresoInsumo) }})</span
          >
          <el-input-number
            v-model="nuevoIngresoInsumo.quantity"
            :min="1"
            class="w-100"
            @change="calcularTotal()"
          ></el-input-number>
        </div>
        <div class="col-12 col-md-6 my-lg-4 my-2">
          <span class="text-muted">Precio</span>
          <el-input-number
            v-model="nuevoIngresoInsumo.unit_price"
            :min="0.01"
            :step="0.01"
            class="w-100"
          ></el-input-number>
        </div>
        <div class="col-12 col-md-6 my-lg-4 my-2">
          <span class="text-muted">Total</span>
          <el-input-number
            v-model="nuevoIngresoInsumo.total"
            :min="0.01"
            :step="0.01"
            class="w-100"
            @change="calcularTotal()"
          ></el-input-number>
        </div>
      </div>
      <el-button
        class="d-block mx-auto my-1 w-50"
        v-on:click="crearIngresoInsumo(nuevoIngresoInsumo)"
        >Agregar Ingreso</el-button
      >
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      nuevoIngresoInsumo: {
        inventory_product: "",
        date: "",
        quantity: 0,
        unit_price: 0,
        total: 0,
      },
      cargando: false,
      listadoInsumos: [],
    };
  },
  mounted() {
    this.obtenerTodosInsumos();
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
    async obtenerTodosInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosInsumos();
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
    calcularTotal() {
      /*this.nuevoIngresoInsumo.total =
        Math.round(
          this.nuevoIngresoInsumo.unit_price *
            this.nuevoIngresoInsumo.quantity *
            100
        ) / 100;*/
      this.nuevoIngresoInsumo.unit_price =
        this.nuevoIngresoInsumo.total / this.nuevoIngresoInsumo.quantity;
    },
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
    async crearIngresoInsumo(data) {
      if (!this.validarDatos(data)) {
        ElMessage.error("Por favor, ingrese todos los datos");
        return;
      }
      this.cargando = true;
      try {
        const respuesta = await api.crearIngresoInsumo(data);
        ElMessage.success({
          message:
            "Se ha creado el ingreso de insumo con ID: " + respuesta.data._id,
        });
        this.$router.push({ name: "Insumos" });
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al crear el ingreso de insumo");
        }
      }
      this.cargando = false;
    },
    validarDatos(data) {
      if (data.inventory_product == "") {
        return false;
      }
      if (data.date == "") {
        return false;
      }
      if (data.quantity == "" || data.quantity <= 0) {
        return false;
      }
      if (data.unit_price == "" || data.unit_price <= 0) {
        return false;
      }
      if (data.total == "" || data.total <= 0) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss"></style>
