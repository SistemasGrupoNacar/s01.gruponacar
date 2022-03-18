<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega una nueva venta"
    placement="top"
  >
    <el-button class="nueva-venta" type="primary" v-on:click="nuevaVenta()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title text-start">Detalle de ventas</p>
    <p class="_subtitle text-muted text-start">Listado de ventas realizadas.</p>
    <p class="_semi-bold m-0">Filtros</p>

    <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
      Mostrar todas: <el-switch class="mx-2" v-model="filtro.todas" />
    </div>
    <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
      <span>Fecha: </span>
      <el-date-picker
        class="mx-2 w-100"
        v-model="filtro.date"
        type="datetimerange"
        range-separator="al"
        start-placeholder="Fecha de inicio"
        end-placeholder="Fecha de finalizacion"
      ></el-date-picker>
    </div>
    <el-button class="mx-2" type="primary" v-on:click="verificarFiltros()"
      >Filtrar
    </el-button>
  </div>
  <el-main v-loading="cargando" class="">
    <el-table :data="ventas" class="_w-75 mx-auto" max-height="400">
      <el-table-column prop="_id" label="ID" width="250" />
      <el-table-column prop="date_format" sortable label="Fecha" width="200" />
      <el-table-column prop="status" sortable label="Estado" width="150" />
      <el-table-column prop="total_format" label="Total" />
      <el-table-column fixed="right" label="Acción" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="verVenta(scope.row)"
          >
            Ver detalles </el-button
          ><el-button
            type="text"
            size="small"
            v-if="scope.row.status != 'Cancelada'"
            @click.prevent="editarVenta(scope.row)"
          >
            Editar
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <el-dialog
    v-model="mostrarDetalle"
    title="Detalle de Venta"
    width="80%"
    :before-close="cerrarDetalle"
    center
    class="px-0 px-md-5 _text-normal"
  >
    <div class="text-center _border my-2">
      <p class="_text-big">
        Numero de Venta: {{ ventaDetalle._id
        }}<el-tag
          class="mx-4"
          type="danger"
          v-if="ventaDetalle.status === 'Cancelada'"
        >
          Cancelada</el-tag
        >
      </p>
    </div>
    <div class="text-center _border my-2">
      <p class="_bold _text-normal">Generalidades</p>
      <p class="_text-normal my-0">Fecha: {{ ventaDetalle.date_format }}</p>
      <p class="_text-normal mt-0">
        Estado: {{ ventaDetalle.pending ? "Pendiente" : "Cerrada" }}
      </p>
    </div>

    <div class="text-center my-2 _text-normal">
      <span class="_bold">Productos: </span>
      <div
        v-for="item in ventaDetalle.detail_sale"
        :key="item._id"
        class="mx-1"
      >
        <p class="m-0 _semi-bold">{{ item.product.name }}</p>
        <p class="m-0">Cantidad: {{ item.quantity }}</p>
        <p class="m-0">
          Precio Unitario: $ {{ formatearMoneda(item.sub_total) }}
        </p>
        <p class="m-0">Sub-Total: $ {{ formatearMoneda(item.total) }}</p>
      </div>
      <span class="_semi-bold">Total: {{ ventaDetalle.total_format }}</span>
    </div>
  </el-dialog>
</template>
<script>
import api from "@/api/index.js";
import { Plus } from "@element-plus/icons-vue";
import { verificarSesion } from "@/scripts/Sesion.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      filtro: {
        date: "",
        todas: false,
      },
      ventaDetalle: {},
      ventas: [],
      cargando: false,
      mostrarDetalle: false,
    };
  },
  mounted() {
    this.obtenerVentas();
  },
  methods: {
    formatearMoneda(valor) {
      return valor.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    nuevaVenta() {
      this.$router.push("/movimientos/ventas/nueva");
    },
    cerrarDetalle() {
      this.mostrarDetalle = false;
    },
    verVenta(data) {
      this.ventaDetalle = data;
      this.mostrarDetalle = true;
    },
    async cancelarVenta() {
      await api.cancelarVenta(this.venta._id);
      this.$router.push("/movimientos/ventas");
    },
    editarVenta(data) {
      this.$router.push({ name: "EditarVenta", params: { id: data._id } });
    },
    async obtenerVentas() {
      this.cargando = true;
      try {
        const response = await api.obtenerVentasHoy();
        this.ventas = response.data;
        this.ventas.forEach((element) => {
          element.status = this.formatearEstado(
            element.status,
            element.pending
          );
        });
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          console.log(error.response.data);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error de conexión");
        }
      }
      this.cargando = false;
    },
    async verificarFiltros() {
      this.cargando = true;

      switch (this.filtro.todas) {
        case true:
          if (this.filtro.date.length > 0) {
            const { fechaInicio, fechaFin } = this.dividirFechas(
              this.filtro.date
            );
            try {
              const response = await api.obtenerVentasTodasFecha(
                fechaInicio,
                fechaFin
              );
              this.ventas = response.data.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(
                  element.status,
                  element.pending
                );
              });
            } catch (error) {
              if (error.response) {
                verificarSesion(error);
                ElMessage.error(error.response.data.message);
              } else {
                ElMessage.error("Error de conexión");
              }
            }
            break;
          } else {
            try {
              const response = await api.obtenerVentasTodas();
              this.ventas = response.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(
                  element.status,
                  element.pending
                );
              });
            } catch (error) {
              if (error.response) {
                verificarSesion(error);
                ElMessage.error(error.response.data.message);
              } else {
                ElMessage.error("Error de conexión");
              }
            }
          }
          break;
        case false:
          if (this.filtro.date.length > 0) {
            const { fechaInicio, fechaFin } = this.dividirFechas(
              this.filtro.date
            );
            try {
              const response = await api.obtenerVentasFecha(
                fechaInicio,
                fechaFin
              );
              this.ventas = response.data.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(
                  element.status,
                  element.pending
                );
              });
            } catch (error) {
              if (error.response) {
                verificarSesion(error);
                ElMessage.error(error.response.data.message);
              } else {
                ElMessage.error("Error de conexión");
              }
            }
          } else {
            try {
              const response = await api.obtenerVentasHoy();
              this.ventas = response.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(
                  element.status,
                  element.pending
                );
              });
            } catch (error) {
              if (error.response) {
                verificarSesion(error);
                ElMessage.error(error.response.data.message);
              } else {
                ElMessage.error("Error de conexión");
              }
            }
          }
          break;
      }
      this.cargando = false;
    },
    dividirFechas(fecha) {
      // Formatear fechas
      const fechaInicio = new Date(fecha[0]).toISOString().split("T")[0];
      const fechaFin = new Date(fecha[1]).toISOString().split("T")[0];
      return {
        fechaInicio,
        fechaFin,
      };
    },
    formatearEstado(estado, pendiente) {
      if (!estado) {
        return "Cancelada";
      } else {
        if (pendiente) {
          return "Pendiente";
        } else {
          return "Activa";
        }
      }
    },
  },
};
</script>
<style lang="scss">
.nueva-venta {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}

._border {
  border-bottom: 1px solid var(--light-black);
}
._text-normal {
  font-size: 1rem;
}
</style>
