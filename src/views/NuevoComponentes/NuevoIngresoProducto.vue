<template>
  <div class="container">
    <p class="_title">Nuevo Ingreso de Producto (Cosecha)</p>
    <p class="_subtitle text-muted">
      Formulario de registro para el ingreso de nueva cosecha de productos.
    </p>
    <el-main v-loading="cargando" class="my-5">
      <div class="row">
        <div class="col-12 col-md-5 my-2">
          <span class="text-muted">Producci&oacute;n</span>
          <el-select
            v-model="nuevoIngresoProducto.production"
            placeholder="Seleccione producción"
            class="w-100"
          >
            <el-option
              v-for="item in listadoProducciones"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="col-12 col-md-4 my-2">
          <span class="text-muted">Producto</span>
          <el-input
            v-model="nuevoIngresoProducto.product"
            placeholder="Seleccione Producto"
            disabled
          >
          </el-input>
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
import api from "@/api/index.js";
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
      listadoProducciones: [],
      listadoProductos: [],
    };
  },
  mounted() {
    this.obtenerProduccionesYProductos();
  },
  watch: {
    "nuevoIngresoProducto.production": function (data) {
      // Buscar en el listado de producciones la que tenga el id que se seleccionó
      const produccion = this.listadoProducciones.find(
        (item) => item.value === data
      );
      this.nuevoIngresoProducto.product = produccion.product.name;
    }
  },

  methods: {
    async crearIngresoProducto(data) {
      if (!this.validarDatos(data)) {
        alert("Faltan datos");
        return;
      }
      this.cargando = true;
      try {
        const respuesta = await api.crearCosecha(data);
        alert("Ingreso creado con id: " + respuesta.data._id);
        this.$router.push({ name: "Productos" });
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    async obtenerProduccionesYProductos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerProduccionesEnProgreso();
        this.listadoProducciones = respuesta.data;
        // Mapeando los values de las producciones para poder usarlos en el select
        this.listadoProducciones.map((item) => {
          item.value = item._id;
          item.label =
            item._id +
            " - " +
            item.start_date.split("T")[0] +
            "-" +
            item.description.slice(0, 20);
        });
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
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
