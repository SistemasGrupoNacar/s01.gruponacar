<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title text-start">Ingresos</p>
    <p class="_subtitle text-muted text-start">
      Informaci&oacute;n gerencial de ingresos.
    </p>
    <el-main v-loading="cargando" class="m-0"
      ><p class="_semi-bold m-0">Filtros</p>
      <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
        <span>Semana: </span>
        <el-date-picker
          v-model="filtro.date"
          type="week"
          class="mx-2 w-100"
          format="[Semana] ww"
          placeholder="Seleccione una semana"
        />
      </div>
      <el-button v-on:click="filtrar(filtro)">Filtrar </el-button>
      <el-tabs :tab-position="position" class="my-4">
        <el-tab-pane label="General">
          <p class="_title my-0">Informaci&oacute;n general de ingresos</p>
          <div class="container my-2">
            <p
              class="_text-big my-0"
              v-if="filtro.date != null && ingresos.sales.filtered"
            >
              {{ ingresos.sales.startDateFormat }} -
              {{ ingresos.sales.endDateFormat }}
            </p>
          </div>
          <div
            class="d-flex flex-row flex-wrap justify-content-around align-items-center"
          >
            <div class="_widget-1">
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
            <div class="_widget-2 bg-light _w-40">
              <p
                class="_text-small _bold w-100 my-0"
                v-if="!ingresos.sales.filtered"
              >
                Total del Mes
              </p>
              <p class="_text-small _bold w-100 my-0" v-else>Total</p>
              <el-icon>
                <sort-down />
              </el-icon>
              <span class="_text-biggest">{{
                ingresos.general.totalCurrentMonthFormat.split(".")[0]
              }}</span
              >.{{ ingresos.general.totalCurrentMonthFormat.split(".")[1] }}
            </div>
            <div class="_widget-3">
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
                v-for="(item, index) in ingresos.general
                  .statisticsIngressThreeMonths"
                :key="index"
                class="my-0"
              >
                {{ item.monthName }} -
                <span class="_text-biggest">{{
                  item.total_format.split(".")[0]
                }}</span
                >.{{ item.total_format.split(".")[1].slice(0, 2) }}
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Ventas">
          <div class="row">
            <div class="col-12 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <span class="">
                {{ ingresos.sales.startDateFormat }}
              </span>
              <span class="mx-1">-</span>
              <span class="">
                {{ ingresos.sales.endDateFormat }}
              </span>
              <el-tag class="mx-2" type="info" v-show="ingresos.sales.filtered"
                >Filtrado</el-tag
              >
              <div class="_bold">
                TOTAL:
                {{ ingresos.sales.total_format }}
              </div>
              <grafica :datos="ingresos.sales.graphic" />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Otros">
          <div class="row">
            <div class="col-12 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Ganancias/Fechas</p>
              <span class="">
                {{ ingresos.extraMoves.startDateFormat }}
              </span>
              <span class="mx-1">-</span>
              <span class="">
                {{ ingresos.extraMoves.endDateFormat }}
              </span>
              <el-tag
                class="mx-2"
                type="info"
                v-show="ingresos.extraMoves.filtered"
                >Filtrado</el-tag
              >
              <div class="_bold">
                TOTAL:
                {{ ingresos.extraMoves.total_format }}
              </div>
              <grafica :datos="ingresos.extraMoves.graphic" />
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
import { ElMessage } from "element-plus";
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
        date: null,
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
    fechaFiltro(val) {
      if (val.date != null) {
        let firstDate = new Date(val.date);
        let startDate = new Date(firstDate.setHours(0, 0, 0, 0));
        // Agregar 7 dias a la primera fecha
        firstDate.setDate(firstDate.getDate() + 6);
        let endDate = new Date(firstDate.setHours(23, 59, 59, 59));
        // Dejando con formato ISO las fechas
        startDate = startDate.toISOString();
        endDate = endDate.toISOString();
        this.filtro.dateSplit = [startDate, endDate];
        return;
      } else {
        this.filtro.dateSplit = null;
        return;
      }
    },
    async obtenerIngresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerIngresos();
        this.ingresos = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición, intente nuevamente.");
        }
      }
      this.cargando = false;
    },
    async filtrar(data) {
      this.cargando = true;
      this.fechaFiltro(data);
      if (data.date != null) {
        const startDate = data.dateSplit[0];
        const endDate = data.dateSplit[1];
        try {
          const respuesta = await api.obtenerIngresosFecha(startDate, endDate);
          this.ingresos = respuesta.data;
        } catch (error) {
          if (error.response) {
            ElMessage.error(error.response.data.message);
          } else {
            ElMessage.error(
              "Error al realizar la petición, intente nuevamente."
            );
          }
        }
      } else {
        ElMessage.warning(
          "Sin rango de fechas, se obtuvieron todos los datos."
        );
        this.obtenerIngresos();
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
