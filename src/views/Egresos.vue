<template>
  <div class="container py-2 px-1 px-lg-4 text-center">
    <p class="_title text-start">Egresos</p>
    <p class="_subtitle text-muted text-start">
      Informaci&oacute;n gerencial de egresos.
    </p>
    <el-main v-loading="cargando" class="m-0">
      <div class="d-inline-flex align-items-center mx-2 my-2 my-lg-0">
        <span>Fecha: </span>
        <el-date-picker
          class="mx-2 w-100"
          v-model="filtro.date"
          type="datetimerange"
          start-placeholder="Fecha de inicio"
          end-placeholder="Fecha de finalizacion"
        ></el-date-picker>
      </div>
      <el-button v-on:click="filtrar(filtro)">Filtrar </el-button>
      <el-tabs :tab-position="position" class="my-4">
        <el-tab-pane label="General">
          <p class="_title my-2">Informaci&oacute;n general de egresos</p>
          <div class="container my-2">
            <p
              class="_text-big my-0"
              v-if="filtro.date != '' && egresos.inventoryEntries.filtered"
            >
              {{ egresos.inventoryEntries.startDateFormat }} -
              {{ egresos.inventoryEntries.endDateFormat }}
            </p>
          </div>
          <div
            class="d-flex flex-row flex-wrap justify-content-around align-items-center"
          >
            <div class="bg-light _widget-1">
              <p class="_text-small _bold w-100 my-0">Incremento</p>
              <el-icon>
                <sort-up v-if="egresos.general.percentageIncDec >= 0" />
                <sort-down v-if="egresos.general.percentageIncDec < 0" />
              </el-icon>
              <span
                class="_text-biggest"
                v-if="
                  egresos.general.percentageIncDec ||
                  egresos.general.percentageIncDec != null
                "
                >{{ egresos.general.percentageIncDec }}</span
              >
              <span class="_text-biggest" v-else>0</span>%
            </div>
            <div class="_widget-2 bg-light _w-40">
              <p class="_text-small _bold w-100 my-0">Total del Mes</p>
              <el-icon>
                <sort-down />
              </el-icon>
              <span class="_text-biggest">{{
                egresos.general.totalCurrentMonthFormat.split(".")[0]
              }}</span
              >.{{ egresos.general.totalCurrentMonthFormat.split(".")[1] }}
            </div>
            <div class="_widget-3 bg-light">
              <p class="_text-small _bold w-100 my-0">Porcentaje en Otros</p>
              <el-icon>
                <sort-down />
              </el-icon>
              <span class="_text-biggest">{{
                egresos.general.extraPercentageFormat
              }}</span
              >%
            </div>
            <div class="w-100 container my-3 border-top py-2">
              <p class="_text-small _bold w-100 my-0">Datos pasados</p>
              <p
                v-for="(item, index) in egresos.general
                  .statisticsEgressThreeMonths"
                :key="index"
                class="my-0"
              >
                {{ item.monthName }} -
                <span class="_text-biggest">{{
                  item.total_format.split(".")[0]
                }}</span
                >.{{ item.total_format.split(".")[1] }}
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Insumos">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.inventoryEntries.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">Detalle de Egresos</p>
              <hr />
              <div class="container my-3 text-center">
                <div class="_light">
                  <span class="">
                    {{ egresos.inventoryEntries.startDateFormat }}
                  </span>
                  <span class="mx-1">-</span>
                  <span class="">
                    {{ egresos.inventoryEntries.endDateFormat }}
                  </span>
                  <el-tag
                    class="mx-auto"
                    type="info"
                    v-show="egresos.inventoryEntries.filtered"
                    >Filtrado</el-tag
                  >
                </div>
                <hr />
                <div class="container my-2">
                  <el-icon><SortUp /> </el-icon>
                  <span class="mx-2"
                    >Egreso mayor: {{ egresos.inventoryEntries.max }}</span
                  >
                </div>
                <div class="container my-2">
                  <el-icon><SortDown /> </el-icon>
                  <span class="mx-2"
                    >Egreso menor: {{ egresos.inventoryEntries.min }}</span
                  >
                </div>
                <div class="container my-3 bg-light rounded-3 p-2 _text-bigger">
                  <el-icon><Money /> </el-icon>
                  <span class="_bold mx-2"
                    >Total: $ {{ egresos.inventoryEntries.total }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Salarios">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.inventoryEntries.graphic" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Otros">
          <div class="row">
            <div class="col-12 col-md-7 my-2">
              <p class="_semi-bold my-1">Gr&aacute;fico de Costos/Fechas</p>
              <grafica :datos="egresos.extraMoves.graphic" />
            </div>
            <div class="col-12 col-lg-5 my-2">
              <p class="_semi-bold my-1">Detalle de Egresos por otros</p>
              <hr />
              <div class="container my-3 text-center">
                <div class="_light">
                  <span class="">
                    {{ egresos.extraMoves.startDateFormat }}
                  </span>
                  <span class="mx-1">-</span>
                  <span class="">
                    {{ egresos.extraMoves.endDateFormat }}
                  </span>
                  <el-tag
                    class="mx-auto"
                    type="info"
                    v-show="egresos.extraMoves.filtered"
                    >Filtrado</el-tag
                  >
                </div>
                <hr />
                <div class="container my-2">
                  <el-icon><SortUp /> </el-icon>
                  <span class="mx-2"
                    >Egreso mayor: {{ egresos.extraMoves.max }}</span
                  >
                </div>
                <div class="container my-2">
                  <el-icon><SortDown /> </el-icon>
                  <span class="mx-2"
                    >Egreso menor: {{ egresos.extraMoves.min }}</span
                  >
                </div>
                <div class="container my-3 bg-light rounded-3 p-2 _text-bigger">
                  <el-icon><Money /> </el-icon>
                  <span class="_bold mx-2"
                    >Total: $ {{ egresos.extraMoves.total }}</span
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
import { ElMessage } from "element-plus";

export default {
  components: { Grafica },
  data() {
    return {
      egresos: {
        general: {
          totalCurrentMonthFormat: "",
          extraPercentageFormat: "",
        },
        inventoryEntries: {
          graphic: [],
          totalEgress: 0,
          filtered: false,
          startDate: "",
          endDate: "",
        },
        salaries: {},
        extraMoves: {
          graphic: [],
          totalEgress: 0,
          filtered: false,
          startDate: "",
          endDate: "",
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
    this.obtenerEgresos();
  },
  methods: {
    async obtenerEgresos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerEgresos();
        this.egresos = respuesta.data;
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
      if (data.date != null) {
        const startDate = data.date[0].toISOString();
        const endDate = data.date[1].toISOString();
        try {
          const respuesta = await api.obtenerEgresosFecha(startDate, endDate);
          this.egresos = respuesta.data;
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
        this.obtenerEgresos();
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
