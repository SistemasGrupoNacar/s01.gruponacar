<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title">Movimientos (Egresos)</p>
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
      <el-tabs :tab-position="position" class=" my-4">
        <el-tab-pane label="General">
          <p class="_title my-2">Informaci&oacute;n general de egresos</p>
          <p class="text-muted my-0">
            Sub-total en insumos: $ {{ egresos.inventoryProducts.total }}
          </p>
          <p class="text-muted my-0">
            Sub-total en salarios: $ {{ egresos.salaries.total }}
          </p>
          <p class="text-muted my-0">
            Sub-total en extras: $ {{ egresos.extraMoves.total }}
          </p>
          <hr />
          <p class="_title">
            Total: <span class="_semi-bold">$ {{ egresos.general.total }}</span>
          </p>
        </el-tab-pane>
        <el-tab-pane label="Insumos">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.inventoryProducts.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">
                Detalle de Egresos
                <el-tag
                  class="mx-3"
                  type="info"
                  v-show="egresos.inventoryProducts.filtered"
                  >Filtrado</el-tag
                >
              </p>
              <div class="container my-3 text-start">
                <p class="text-muted my-2">
                  Fecha: {{ egresos.inventoryProducts.startDate }} -
                  {{ egresos.inventoryProducts.endDate }}
                </p>
                <p class="text-muted my-2">
                  Total por Insumos: $
                  {{ egresos.inventoryProducts.total }}
                </p>
                <p class="text-muted my-2">
                  D&iacute;a de mayor gasto:
                  {{ egresos.inventoryProducts.total }}
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Salarios">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.inventoryProducts.graphic" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Otros">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.inventoryProducts.graphic" />
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
      egresos: {
        general: {
          total: 0,
        },
        inventoryProducts: {
          graphic: [],
          totalEgress: 0,
          filtered: false,
          startDate: "",
          endDate: "",
        },
        salaries: {},
        extraMoves: {},
      },
      cargando: false,
      filtro: {},
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
    this.obtenerEgresos();
  },
  methods: {
    async obtenerEgresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerEgresos();
        this.egresos = respuesta.data;
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
        const respuesta = await api.obtenerEgresosFecha(startDate, endDate);
        this.egresos = respuesta.data;
      } catch (error) {
        console.log(error);
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
