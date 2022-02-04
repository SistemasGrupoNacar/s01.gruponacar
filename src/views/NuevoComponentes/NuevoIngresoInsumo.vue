<template>
  <div class="container">
    <p class="_title">Nuevo Ingreso de Insumos</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el ingreso de nueva mercader&iacute;a de
      insumo.
    </p>
    <el-main v-loading="cargando" class="my-2">
      <div class="row">
        <div class="col-12 col-md-5 my-2 my-lg-0">
          <span class="text-muted">Insumo</span>
          <el-select
            v-model="nuevoIngresoInsumo.inventory_product"
            placeholder="Seleccione insumo"
            class="w-100"
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
          <span class="text-muted">Cantidad</span>
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
            @change="calcularTotal()"
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
    async obtenerTodosInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosInsumos();
        this.listadoInsumos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    calcularTotal() {
      this.nuevoIngresoInsumo.total =
        Math.round(
          this.nuevoIngresoInsumo.unit_price *
            this.nuevoIngresoInsumo.quantity *
            100
        ) / 100;
    },
    async crearIngresoInsumo(data) {
      if (!this.validarDatos(data)) {
        alert("Faltan datos");
        return;
      }
      this.cargando = true;
      try {
        const respuesta = await api.crearIngresoInsumo(data);
        alert("Ingreso de Insumo creado con id: " + respuesta.data._id);
        this.$router.push({ name: "Insumos" });
      } catch (error) {
        console.log(error);
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
