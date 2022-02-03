<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title text-start">Ingresos</p>
    <p class="_subtitle text-muted text-start">
      Informaci&oacute;n gerencial de ingresos.
    </p>
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
          <p class="_title my-0">Informaci&oacute;n general de ingresos</p>
          <div class="container my-2">
            <p
              class="_text-big my-0"
              v-if="filtro.date != '' && ingresos.sales.filtered"
            >
              {{ filtro.date[0].toLocaleString().split(" ")[0] }} -
              {{ filtro.date[1].toLocaleString().split(" ")[0] }}
            </p>
          </div>
          <div
            class="d-flex flex-row flex-wrap justify-content-around align-items-center"
          >
            <div class="bg-light _widget-1">
              <p class="_text-small _bold w-100 my-0">Incremento</p>
              <el-icon>
                <sort-up v-if="ingresos.general.percentageIncDec > 0" />
                <sort-down v-if="ingresos.general.percentageIncDec < 0" />
              </el-icon>
              <span
                class="_text-biggest"
                v-if="
                  ingresos.general.percentageIncDec ||
                  ingresos.general.percentageIncDec != null
                "
                >{{ ingresos.general.percentageIncDec }}</span
              >
              <span class="_text-biggest" v-else>0</span>%
            </div>
            <div class="_widget-2 bg-warning _w-40">
              <p class="_text-small _bold w-100 my-0">Total del Mes</p>
              <el-icon>
                <sort-down />
              </el-icon>
              <span class="_text-biggest">{{
                ingresos.general.totalCurrentMonthFormat.split(".")[0]
              }}</span
              >.{{ ingresos.general.totalCurrentMonthFormat.split(".")[1] }}
            </div>
            <div class="_widget-3 bg-light">
              <p class="_text-small _bold w-100 my-0">Porcentaje en Otros</p>
              <el-icon>
                <sort-down />
              </el-icon>
              <span class="_text-biggest">{{
                ingresos.general.extraPercentageFormat
              }}</span
              >%
            </div>
            <div class="w-100 container my-3 border-top py-2">
              <p class="_text-small _bold w-100 my-0">Datos pasados</p>
              <p
                v-for="(item, index) in ingresos.general.statisticsSales"
                :key="index"
                class="my-0"
              >
                {{ item.monthName }} - $<span class="_text-biggest">{{
                  item.total.toString().split(".")[0]
                }}</span
                >.{{ item.total.toString().split(".")[1].slice(0, 2) }}
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Ventas">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <grafica :datos="ingresos.sales.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">Detalle de Ingresos</p>
              <hr />
              <div class="container my-3 text-center">
                <div class="_bold _text-big">
                  {{ ingresos.sales.startDate }} - {{ ingresos.sales.endDate
                  }}<el-tag
                    class="mx-3"
                    type="info"
                    v-show="ingresos.sales.filtered"
                    >Filtrado</el-tag
                  >
                </div>
                <div class="container my-2">
                  <el-icon><SortUp /> </el-icon>
                  <span class="mx-2">Ingreso mayor: Lunes 25 de enero</span>
                </div>
                <div class="container my-2">
                  <el-icon><SortDown /> </el-icon>
                  <span class="mx-2">Ingreso menor: Martes 26 de enero</span>
                </div>
                <div class="container my-3 bg-light rounded-3 p-2 _text-bigger">
                  <el-icon><Money /> </el-icon>
                  <span class="_bold mx-2"
                    >Total: $ {{ ingresos.sales.total }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Otros">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <grafica :datos="ingresos.extraMoves.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">Detalle de Ingresos por otros</p>
              <hr />
              <div class="container my-3 text-center">
                <div class="_bold _text-big">
                  {{ ingresos.extraMoves.startDate }} -
                  {{ ingresos.extraMoves.endDate
                  }}<el-tag
                    class="mx-3"
                    type="info"
                    v-show="ingresos.extraMoves.filtered"
                    >Filtrado</el-tag
                  >
                </div>
                <div class="container my-2">
                  <el-icon><SortUp /> </el-icon>
                  <span class="mx-2">Ingreso mayor: Lunes 25 de enero</span>
                </div>
                <div class="container my-2">
                  <el-icon><SortDown /> </el-icon>
                  <span class="mx-2">Ingreso menor: Martes 26 de enero</span>
                </div>
                <div class="container my-3 bg-light rounded-3 p-2 _text-bigger">
                  <el-icon><Money /> </el-icon>
                  <span class="_bold mx-2"
                    >Total: $ {{ ingresos.extraMoves.total }}</span
                  >
                </div>
              </div>
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
// Importar icono de element-ui
import { SortUp, SortDown } from "@element-plus/icons-vue";
export default {
  components: { Grafica, SortUp, SortDown },
  data() {
    return {
      ingresos: {
        general: {
          totalCurrentMonthFormat: "",
          extraPercentageFormat: "",
        },
        sales: {
          graphic: [],
          total: 0,
          startDate: "",
          endDate: "",
          filtered: false,
        },
        extraMoves: {
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
<style lang="scss">
._widget-1 {
}

._widget-2 {
}

@media (min-width: 768px) {
}
</style>
