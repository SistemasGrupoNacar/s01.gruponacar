<template>
  <div class="container">
    <p class="_title">Nuevo Ingreso de Producto (Cosecha)</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el ingreso de nueva cosecha de productos.
    </p>
    <el-main  v-loading="cargando" class="my-5">
      <div class="row">
        <div class="col-12 col-md-5 my-2">
          <span class="text-muted">Producci&oacute;n</span>
          <el-select
            v-model="nuevoIngresoProducto.production"
            placeholder="Seleccione producción"
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
        <div class="col-12 col-md-4 my-2">
          <span class="text-muted">Producto</span>
          <el-select
            v-model="nuevoIngresoProducto.product"
            placeholder="Seleccione producto"
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
        <div class="col-12 col-md-3 my-2">
          <span class="text-muted">Cantidad</span>
          <el-input-number
            v-model="nuevoIngresoProducto.quantity"
            :min="1"
            class="w-100"
          />
        </div>
        <div class="col-12 col-md-6 my-2">
          <span class="text-muted">Fecha</span>
          <el-date-picker
            v-model="nuevoIngresoProducto.date"
            type="date"
            placeholder="Escoge una fecha"
            class="w-100"
            clearable
          >
          </el-date-picker>
        </div>
        <div class="col-12 col-md-6 my-2">
          <span class="text-muted">Descripci&oacute;n</span>
          <el-input
            v-model="nuevoIngresoProducto.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Ingrese descripción"
          >
          </el-input>
        </div>
      </div>
      <el-button
        class="d-block mx-auto my-1 w-50"
        v-on:click="crearIngresoProducto(nuevoIngresoProducto)"
        >Agregar Ingreso</el-button
      >
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nuevoIngresoProducto: {
        production: "",
        product: "",
        description: "",
        quantity: 0,
        date: "",
      },
      cargando: true,
      options: [
        {
          value: "1",
          label: "Produccion 1",
        },
        {
          value: "2",
          label: "Produccion 2",
        },
        {
          value: "3",
          label: "Produccion 3",
        },
      ],
    };
  },
  methods: {
    crearIngresoProducto(data) {
      if (this.validarDatos(data)) {
        console.log(data);
      } else {
        alert("Faltan datos");
      }
    },
    validarDatos(data) {
      if (data.production == "") {
        return false;
      }
      if (data.product == "") {
        return false;
      }
      if (data.quantity == "" || data.quantity <= 0) {
        return false;
      }
      if (data.date == "") {
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang=""></style>
