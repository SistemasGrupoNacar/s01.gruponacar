<template>
  <div class="container py-3">
    <div class="_detail">
      <div class="px-5">
        <p class="_text-bigger text-center my-0">{{ venta._id }}</p>
        <p class="my-0 _light text-end" v-if="venta.date">
          {{ venta.date.slice(0, 10) }}
        </p>
      </div>

      <p class="_text-bigger _bold text-end px-5">$ {{ venta.total || 0 }}</p>

      <div class="text-center px-2">
        <el-button class="my-2" type="primary" v-on:click="cancelarVenta()"
          >Cancelar Venta
        </el-button>
        <el-button class="my-2 text-end" type="" v-on:click="finalizarVenta()"
          >Finalizar Venta
        </el-button>
      </div>
    </div>
    <hr />
    <el-main v-loading="cargando" class="w-100 main">
      <div class="row my-1">
        <div class="col-12 col-lg-4 px-lg-2">
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
        <div class="col-12 col-lg-8 px-lg-2">
          <p class="_bold">Detalle de Venta</p>
          <el-table :data="detalleVenta" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="180" />
            <el-table-column
              prop="name"
              label="Nombre de Producto"
              width="180"
            />
            <el-table-column prop="quantity" label="Cantidad" width="120" />
            <el-table-column
              prop="sub_total"
              label="Precio Unitario"
              width="120"
            />
            <el-table-column
              prop="total"
              label="Sub-Total"
              width="120"
            /><el-table-column fixed="right" label="Acción" width="120">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.prevent="eliminarDetalleVenta(scope.row)"
                >
                  Quitar
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { fechaActual } from "@/scripts/Fechas.js";

import { ElMessage } from "element-plus";
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
      this.$router.push("/movimientos/ventas");
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
        ElMessage({
          message: "Complete los campos requeridos",
          type: "warning",
        });
        return;
      }
      this.cargando = true;
      try {
        const respuesta = await api.crearDetalleVenta(data);
        // Agregar a detalleVenta el producto agregado
        const producto = this.productos.find(
          (item) => item._id === respuesta.data.product
        );
        respuesta.data.name = producto.name;
        // Agregar a detalleVenta el producto agregado
        this.detalleVenta.push(respuesta.data);
        // Actualizar la venta
        this.actualizarVenta(this.venta._id);
      } catch (error) {
        ElMessage({
          message: "Error al agregar producto",
          type: "error",
        });
      }
      this.cargando = false;
    },

    async actualizarVenta(id) {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerVenta(id);
        this.venta = respuesta.data;
      } catch (error) {
        ElMessage({
          message: "Error al actualizar la venta",
          type: "error",
        });
      }
      this.cargando = false;
    },

    async eliminarDetalleVenta(data) {
      this.cargando = true;
      try {
        await api.eliminarDetalleVenta(data._id);
        this.detalleVenta = this.detalleVenta.filter(
          (item) => item._id !== data._id
        );
        // Actualizar la venta
        this.actualizarVenta(this.venta._id);
      } catch (error) {
        ElMessage({
          message: "No se pudo eliminar la venta",
          type: "error",
        });
      }
      this.cargando = false;
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

    finalizarVenta() {
      if (this.detalleVenta.length == 0) {
        this.cancelarVenta();
      } else {
        this.$router.push("/movimientos/ventas");
      }
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
      ElMessage({
        message: "No se pudo crear la venta",
        type: "error",
      });
    }
  },
};
</script>
<style lang="scss">
._detail {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: var(--white);
  z-index: 10;
  display: block;
  height: 180px;
}

.main {
  padding-bottom: 180px;
}

@media (min-width: 768px) {
  ._detail {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100px;
  }
  .main {
    padding-bottom: 100px;
  }
}
</style>
