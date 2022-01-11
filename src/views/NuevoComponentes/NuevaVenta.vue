<template>
  <div class="container py-3">
    <p class="_bold _text-big my-0">Venta: {{ venta._id }}</p>
    <p class="_text-small my-0 _light" v-if="venta.date">
      Fecha: {{ venta.date.slice(0, 10) }}
    </p>

    <el-button class="my-2" type="primary" v-on:click="cancelarVenta()"
      >Cancelar Venta
    </el-button>
    <hr />
    <el-main v-loading="cargando">
      <div class="row my-1">
        <div class="col-12 col-md-6 col-lg-4 px-0 px-lg-2">
          <p class="_bold">Seleccion de producto</p>
          <span class="text-muted">Producto: </span>
          <el-select
            v-model="productoSeleccionado.product"
            class="m-2 w-100"
            placeholder="Seleccione producto"
            size="large"
          >
            <el-option
              v-for="item in productos"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <span class="text-muted">Producci&oacute;n: </span>
          <el-select
            v-model="productoSeleccionado.production"
            class="m-2 w-100"
            placeholder="Seleccione producción"
            size="large"
          >
            <el-option
              v-for="item in producciones"
              :key="item._id"
              :label="item._id"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <span class="text-muted">Cantidad: </span>
          <el-input-number
            v-model="productoSeleccionado.quantity"
            :min="1"
            :step="1"
            class="w-100 my-2"
            @change="calcularTotal()"
          />
          <span class="text-muted">Sub-total: </span>
          <el-input-number
            v-model="productoSeleccionado.sub_total"
            :min="0.01"
            :step="0.01"
            class="w-100 my-2"
            @change="calcularTotal()"
          ></el-input-number>
          <span class="text-muted">Total: </span>
          <el-input-number
            v-model="productoSeleccionado.total"
            class="w-100 my-2"
            disabled
          ></el-input-number>

          <el-button
            class="my-2 w-100"
            type=""
            v-on:click="agregarDetalleVenta(productoSeleccionado)"
            >Agregar Producto
          </el-button>
        </div>
        <div class="col-12 col-md-6 col-lg-8 px-0 px-lg-3">
          <p class="_bold">Detalle de Venta</p>
          {{ productoSeleccionado }}
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { fechaActual } from "@/scripts/Fechas.js";
export default {
  data() {
    return {
      venta: {},
      cargando: false,
      productos: [],
      producciones: [],
      productoSeleccionado: {
        sale: "",
        product: "",
        production: "",
        quantity: 0,
        sub_total: 0,
        total: 0,
      },
      detalleVenta: [],
    };
  },
  methods: {
    async cancelarVenta() {
      await api.cancelarVenta(this.venta._id);
      this.$router.push("/producciones/ventas");
    },
    async obtenerProductos() {
      const respuesta = await api.obtenerProductos();
      this.productos = respuesta.data;
    },
    async obtenerTodasProducciones() {
      const respuesta = await api.obtenerTodasProducciones();
      this.producciones = respuesta.data;
    },
    calcularTotal() {
      // Redondear a 2 decimales
      this.productoSeleccionado.total =
        Math.round(
          this.productoSeleccionado.quantity *
            this.productoSeleccionado.sub_total *
            100
        ) / 100;
    },

    async agregarDetalleVenta(data) {
      data.sale = this.venta._id;
      if (!this.validarDetalleVenta) {
        return;
      }
      this.cargando = true;
      try {
        const respuesta = await api.crearDetalleVenta(data);
        console.log(respuesta);
      } catch (error) {
        console.log(error);
      }
    },
    validarDetalleVenta(data) {
      if (data.sale == "") {
        return false;
      }
      if (data.product == "") {
        return false;
      }
      if (data.production == "") {
        return false;
      }
      if (data.quantity <= 0) {
        return false;
      }
      if (data.sub_total <= 0) {
        return false;
      }
      if (data.total <= 0) {
        return false;
      }
      return true;
    },
  },

  async mounted() {
    try {
      this.cargando = true;
      this.fecha = fechaActual;
      const respuesta = await api.crearVenta({
        date: fechaActual,
      });
      this.venta = respuesta.data;
      this.obtenerProductos();
      this.obtenerTodasProducciones();
      this.cargando = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style lang=""></style>
