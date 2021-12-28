<template>
  <div class="container">
    <p class="_title">Nuevo Ingreso de Insumos</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el ingreso de nueva mercader&iacute;a de
      insumo.
    </p>
    <form class="my-2">
      <div class="row">
        <div class="col-12 col-md-5 my-2 my-lg-0">
          <span class="text-muted">Insumo</span>
          <el-select
            v-model="nuevoIngresoInsumo.inventory_product"
            placeholder="Seleccione insumo"
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
        </div>
        <div class="col-12 col-md-4 my-2 my-lg-0">
          <span class="text-muted">Fecha</span>
          <el-date-picker
            v-model="nuevoIngresoInsumo.date"
            type="date"
            placeholder="Escoge una fecha"
            class="w-100"
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
        >Agregar Ingreso de Insumo</el-button
      >
    </form>
  </div>
</template>
<script>
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
      options: [
        {
          value: "1",
          label: "Insumo 1",
        },
        {
          value: "2",
          label: "Insumo 2",
        },
      ],
    };
  },
  methods: {
    calcularTotal() {
      this.nuevoIngresoInsumo.total =
        Math.round(
          this.nuevoIngresoInsumo.unit_price *
            this.nuevoIngresoInsumo.quantity *
            100
        ) / 100;
    },
    crearIngresoInsumo(data) {
      if (this.validarDatos(data)) {
        alert(data);
      } else {
        alert("Datos invalidos");
      }
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
