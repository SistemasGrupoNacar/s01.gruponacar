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
    <p class="_title">Apartado de Ventas</p>
    <hr />
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
    <el-button type="primary" v-on:click="verificarFiltros()"
      >Filtrar
    </el-button>
  </div>
  <el-main v-loading="cargando" class="container">
    <el-table :data="ventas" class="_w-75 mx-auto">
      <el-table-column prop="_id" label="ID" width="250" />
      <el-table-column prop="date_format" label="Fecha" width="150" />
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
    :md="4"
    :before-close="cerrarDetalle"
    center
  >
    <span class="_bold">ID: {{ ventaDetalle._id }}</span>

    <el-tag
      class="mx-2"
      type="danger"
      v-if="ventaDetalle.status === 'Cancelada'"
    >
      Cancelada</el-tag
    >
    <hr class="m-1" />
    <span class="_semi-bold">Fecha: {{ ventaDetalle.date }}</span>
    <hr class="m-1" />
    <span class="_bold">Productos: </span>
    <div v-for="item in ventaDetalle.detail_sale" :key="item._id" class="mx-1">
      <p class="m-0 _semi-bold">{{ item.product.name }}</p>
      <p class="m-0">Cantidad: {{ item.quantity }}</p>
      <p class="m-0">Precio Unitario: $ {{ item.sub_total }}</p>
      <p class="m-0">Sub-Total: $ {{ item.total }}</p>
      <hr class="m-1" />
    </div>
    <span class="_semi-bold">Total: {{ ventaDetalle.total }}</span>
  </el-dialog>
</template>
<script>
import api from "@/api/index.js";
import { Plus } from "@element-plus/icons-vue";
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
        const response = await api.obtenerVentas();
        this.ventas = response.data;
        this.ventas.forEach((element) => {
          element.status = this.formatearEstado(element.status);
        });
      } catch (error) {
        console.log(error);
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
                element.status = this.formatearEstado(element.status);
              });
            } catch (error) {
              console.log(error);
            }
            break;
          } else {
            try {
              const response = await api.obtenerVentasTodas();
              this.ventas = response.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(element.status);
              });
            } catch (error) {
              console.log(error);
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
                element.status = this.formatearEstado(element.status);
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const response = await api.obtenerVentas();
              this.ventas = response.data;
              this.ventas.forEach((element) => {
                element.status = this.formatearEstado(element.status);
              });
            } catch (error) {
              console.log(error);
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
    formatearEstado(estado) {
      if (!estado) {
        return "Cancelada";
      } else {
        return "Activa";
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
</style>
