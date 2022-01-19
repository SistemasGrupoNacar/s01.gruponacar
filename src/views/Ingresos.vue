<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title">Movimientos (Ingresos)</p>
    <hr />
    <el-main v-loading="cargando" class="m-0">
      <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
        <span>Fecha: </span>
        <el-date-picker
          class="mx-2 w-100"
          v-model="filtro.date"
          type="daterange"
          start-placeholder="Fecha de inicio"
          end-placeholder="Fecha de finalizacion"
        ></el-date-picker>
      </div>
      <el-button type="primary" v-on:click="filtrar(filtro)"
        >Filtrar
      </el-button>

      <el-tabs :tab-position="position" class="my-4">
        <el-tab-pane label="General">
          <p class="_title my-2">Informaci&oacute;n general de ingresos</p>
          <p class="_bold my-1" v-if="filtro.date != '' && ingresos.sales.filtered">
            Fecha: {{ filtro.date[0].toISOString().split("T")[0] }} -
            {{ filtro.date[1].toISOString().split("T")[0] }}
          </p>
          <p class="text-muted my-1">
            Sub-total en ventas: $ {{ ingresos.sales.total }}
          </p>
          <p class="text-muted my-1">
            Sub-total en extras: $ {{ ingresos.extraMoves }}
          </p>
          <hr />
          <p class="_title">
            Total:
            <span class="_semi-bold">$ {{ ingresos.general.total }}</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="Ventas">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <grafica :datos="ingresos.sales.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">
                Detalle de Ingresos
                <el-tag
                  class="mx-3"
                  type="info"
                  v-show="ingresos.sales.filtered"
                  >Filtrado</el-tag
                >
              </p>
              <div class="container my-3 text-start">
                <p class="text-muted my-2">
                  Fecha: {{ ingresos.sales.startDate }} -
                  {{ ingresos.sales.endDate }}
                </p>
                <p class="text-muted my-2">
                  Total por Ventas: $
                  {{ ingresos.sales.total }}
                </p>
                <p class="text-muted my-2">
                  D&iacute;a de mayor ganancia:
                  {{ ingresos.sales.total }}
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Otros">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <grafica :datos="ingresos.sales.graphic" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import Grafica from "@/components/Grafica.vue";

export default {
  components: { Grafica },
  data() {
    return {
      ingresos: {
        general: {
          total: 0,
        },
        sales: {
          graphic: [],
          total: 0,
          startDate: "",
          endDate: "",
          filtered: false,
        },
      },
      cargando: false,
      filtro: {
        date: "",
      },
      position: "top",
    };
  },
  beforeMount() {
    // Verificar el tamaño de la pantalla
    if (window.innerWidth < 768) {
      this.position = "top";
    } else {
      this.position = "left";
    }
  },
  mounted() {
    this.obtenerIngresos();
  },
  methods: {
    async obtenerIngresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerIngresos();
        this.ingresos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
    async filtrar(data) {
      this.cargando = true;
      const startDate = data.date[0].toISOString().split("T")[0];
      const endDate = data.date[1].toISOString().split("T")[0];
      try {
        const respuesta = await api.obtenerIngresosFecha(startDate, endDate);
        this.ingresos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
