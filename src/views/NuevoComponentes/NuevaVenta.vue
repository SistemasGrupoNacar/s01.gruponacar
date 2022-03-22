<template>
  <el-page-header class="my-3" content="Nueva venta" @back="finalizarVenta()" />
  <hr />
  <el-main v-loading.fullscreen.lock="cargando" class="w-100">
    <div class="row">
      <div
        class="col-12 d-flex my-2 justify-content-between align-items-center flex-wrap flex-column flex-md-row my-2"
      >
        <div class="_text-bigger">
          # <span class="_semi-bold">{{ venta._id }}</span>
        </div>
        <div class="d-flex flex-column">
          <span> {{ venta.date_format }}</span>
          <span class="_text-bigger"
            >Total:
            <span v-if="venta.total_format">{{ venta.total_format }} </span>
            <span v-else>$0.00</span></span
          >
        </div>
      </div>
      <div class="col-12 px-1 px-md-5 my-2">
        <p class="_semi-bold _text-small">Detalle de venta</p>
        <div class="row">
          <div class="col-12 col-md-3">
            <span class="_semi-bold _text-small">Producto</span>
            <el-select
              v-model="productoSeleccionado.product"
              class="m-2 w-100"
              placeholder="Seleccione producto"
              size="large"
              filterable
            >
              <el-option
                v-for="item in productos"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-6 col-md-2">
            <span class="_semi-bold _text-small">Cantidad</span>
            <el-input-number
              v-model="productoSeleccionado.quantity"
              :min="1"
              :step="1"
              class="w-100 my-2"
              @change="calcularTotal()"
            />
          </div>
          <div class="col-6 col-md-2">
            <span class="_semi-bold _text-small">Precio unitario</span>
            <el-input-number
              v-model="productoSeleccionado.sub_total"
              :min="0.01"
              :step="0.01"
              class="w-100 my-2"
              @change="calcularTotal()"
            ></el-input-number>
          </div>
          <div class="col-12 col-md-2">
            <span class="_semi-bold _text-small">Sub-total</span>
            <el-input-number
              v-model="productoSeleccionado.total"
              class="w-100 my-2"
              disabled
            ></el-input-number>
          </div>
          <div class="col-12 col-md-2">
            <span class="_semi-bold _text-small">Producci&oacute;n</span>
            <el-select
              v-model="productoSeleccionado.production"
              class="m-2 w-100"
              placeholder="Seleccione producción"
              size="large"
              filterable
            >
              <el-option
                v-for="item in produccionesFiltradas"
                :key="item._id"
                :label="item._id + ' - ' + item.product.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-12 col-md-1">
            <el-button
              class="my-2 w-100"
              style="height: 100%"
              type=""
              v-on:click="agregarDetalleVenta(productoSeleccionado)"
              >+
            </el-button>
          </div>
        </div>
      </div>
      <div class="col-12 my-2">
        <el-table :data="detalleVenta" style="width: 100%" max-height="300">
          <el-table-column prop="_id" label="ID" width="220" />
          <el-table-column
            prop="name"
            label="Nombre de Producto"
            min-width="220"
          />
          <el-table-column prop="quantity" label="Cantidad" width="150" />
          <el-table-column
            prop="sub_total_format"
            label="Precio Unitario"
            width="150"
          />
          <el-table-column
            prop="total_format"
            label="Sub-Total"
            width="150"
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
  <div class="_nuevo">
    <el-button class="my-2" type="primary" v-on:click="cancelarVenta()"
      >Cancelar Venta </el-button
    ><el-button class="my-2 text-end" type="" v-on:click="finalizarVenta()"
      >Finalizar Venta
    </el-button>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      venta: {},
      cargando: false,
      productos: [],
      producciones: [],
      produccionesFiltradas: [],
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
    async nuevaVenta() {
      const fechaActual = new Date().toISOString();
      try {
        this.cargando = true;
        this.fecha = fechaActual;
        const respuesta = await api.crearVenta({
          date: fechaActual,
        });
        this.venta = respuesta.data;
        this.obtenerProductos();
        this.obtenerProducciones();
        this.cargando = false;
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al crear venta");
        }
      }
    },
    async cancelarVenta() {
      try {
        await api.cancelarVenta(this.venta._id);
        this.$router.replace("/movimientos/ventas");
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al cancelar venta");
        }
      }
    },
    async obtenerProductos() {
      try {
        const respuesta = await api.obtenerProductos();
        this.productos = respuesta.data;
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener productos");
        }
      }
    },
    async obtenerProducciones() {
      try {
        const respuesta = await api.obtenerProduccionesEnProgreso();
        this.producciones = respuesta.data;
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener producciones");
        }
      }
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
      if (this.validarProductoProduccion()) {
        ElMessage({
          message: "Seleccione la producción correspondiente al producto",
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
        // Seteando los valores de producto seleccionado
        this.productoSeleccionado.product = "";
        this.productoSeleccionado.quantity = 0;
        this.productoSeleccionado.sub_total = 0;
        this.productoSeleccionado.total = 0;
        this.productoSeleccionado.production = "";
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al agregar detalle de venta");
        }
      }
      this.cargando = false;
    },

    validarProductoProduccion() {
      // Verificar si la produccion se encuntra en produccionesFiltradas
      return (
        this.produccionesFiltradas.find(
          (item) => item._id === this.productoSeleccionado.production
        ) === undefined
      );
    },
    async actualizarVenta(id) {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerVenta(id);
        this.venta = respuesta.data;
      } catch (error) {
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener venta");
        }
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
        if (error.response) {
          
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar detalle de venta");
        }
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

    async finalizarVenta() {
      if (this.detalleVenta.length == 0) {
        this.cancelarVenta();
      } else {
        try {
          this.cargando = true;
          await api.finalizarVenta(this.venta._id);
          ElMessage.success("Venta cerrada");
          this.$router.replace("/movimientos/ventas");
        } catch (error) {
          if (error.response) {
            
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error("Error al finalizar la venta");
          }
        }
      }
    },
  },

  async mounted() {
    this.nuevaVenta();
  },
  watch: {
    productoSeleccionado: {
      handler(element) {
        this.produccionesFiltradas = this.producciones.filter(
          (item) => item.product._id == element.product
        );
      },

      deep: true,
    },
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
