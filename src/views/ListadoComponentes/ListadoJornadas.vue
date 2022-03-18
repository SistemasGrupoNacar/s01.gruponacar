<template>
  <el-page-header
    class="my-3"
    content="Listado de Jornadas"
    @back="irJornadas()"
  />
  <hr />
  <div class="">
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="d-flex flex-wrap justify-content-center align-items-center">
        <div class="my-2 mx-1 mx-md-3">
          <label for="" class="_light">Por nombre</label>
          <el-input
            autocomplete="false"
            v-model="filtro.name"
            placeholder="Cristian Pérez"
            @input="filtroJornadas(filtro, 'name')"
          ></el-input>
        </div>
        <div class="my-2 mx-1 mx-md-3">
          <label for="">Por d&iacute;a</label>
          <el-date-picker
            v-model="filtro.date"
            type="date"
            placeholder="Escoge una fecha"
            class="w-100"
            clearable
            @change="filtroJornadas(filtro, 'date')"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="min-h-50">
        <el-table :data="listadoMostrarJornadas" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div class="row">
                <div class="col-12 col-md-5 my-2">
                  <p class="_bold my-2">Detalle de joranadas</p>
                  <p class="my-1">
                    Estado -
                    <span
                      v-if="props.row.check_out == null"
                      class="_letter-spacing-1 _semi-bold"
                      >En proceso</span
                    >
                    <span v-else class="_letter-spacing-1 _semi-bold">
                      Terminada</span
                    >
                  </p>

                  <p class="my-1">
                    Empleado -
                    <span class="_letter-spacing-1 _semi-bold">
                      {{ props.row.employee.first_name }}
                      {{ props.row.employee.last_name }}
                    </span>
                  </p>
                  <p class="my-1" v-if="props.row.hours">
                    Tiempo trabajado -
                    <span class="_letter-spacing-1 _semi-bold">
                      {{ props.row.hours }}
                    </span>
                  </p>
                  <el-timeline class="my-1">
                    <el-timeline-item
                      :key="props.row._id"
                      :timestamp="props.row.check_in_format"
                    >
                      Entrada
                    </el-timeline-item>
                    <el-timeline-item
                      v-if="props.row.check_out != null"
                      :key="props.row._id"
                      :timestamp="props.row.check_out_format"
                    >
                      Salida
                    </el-timeline-item>
                  </el-timeline>
                  <el-popconfirm
                    confirm-button-text="Si"
                    cancel-button-text="No"
                    :icon="InfoFilled"
                    icon-color="#114B5F"
                    title="¿Está seguro de eliminar esta jornada?"
                    @confirm="eliminarJornada(props.row._id)"
                    @cancel="cancelEvent"
                  >
                    <template #reference>
                      <el-button type="" class="my-1 w-100"
                        >Eliminar jornada
                      </el-button>
                    </template>
                  </el-popconfirm>
                </div>
                <div class="col-12 col-md-7 my-2">
                  <p class="_bold my-2">Mapa de ubicaciones</p>
                  <div class="row">
                    <div class="col-6">
                      <GoogleMap
                        api-key="AIzaSyBS3Ui-nZifQQJs030dE46Poa_8cMLHfVU"
                        :styles="optionsMap"
                        :center="{
                          lat: props.row.inCoordinatesLat,
                          lng: props.row.inCoordinatesLng,
                        }"
                        :zoom="16"
                        class="_map"
                      >
                        <Marker
                          :options="{
                            position: {
                              lat: props.row.inCoordinatesLat,
                              lng: props.row.inCoordinatesLng,
                            },
                          }"
                        />
                      </GoogleMap>

                      <span class="_text-small mx-2 my-1"
                        >Entrada a la empresa</span
                      >
                    </div>
                    <div class="col-6" v-if="props.row.check_out != null">
                      <GoogleMap
                        :styles="optionsMap"
                        :center="{
                          lat: props.row.outCoordinatesLat,
                          lng: props.row.outCoordinatesLng,
                        }"
                        :zoom="16"
                        class="_map"
                      >
                        <Marker
                          :options="{
                            position: {
                              lat: props.row.outCoordinatesLat,
                              lng: props.row.outCoordinatesLng,
                            },
                          }"
                        />
                      </GoogleMap>
                      <span class="_text-small mx-2 my-1"
                        >Salida de la empresa</span
                      >
                    </div>
                    <div
                      class="col-6 d-flex align-items-center justify-content-center"
                      v-else
                    >
                      <p class="_bold">La jornada sigue en proceso.</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Empleado" prop="employee.first_name" />
          <el-table-column label="Fecha de inicio" prop="check_in_format" />
        </el-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { GoogleMap, Marker } from "vue3-google-map";
import moment from "moment";
export default {
  components: {
    GoogleMap,
    Marker,
  },
  watch: {
    filtro: {
      date: {
        deep: true,
        handler(val) {
          this.filtroJornadas(val, "date");
        },
      },
    },
  },

  data() {
    return {
      cargando: false,
      listadoJornadas: [],
      listadoMostrarJornadas: [],
      filtro: {
        name: "",
        date: null,
      },
      optionsMap: [
        {
          stylers: [
            {
              saturation: -100,
              visibility: "off",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.obtenerListadoJornadas();
  },
  methods: {
    irJornadas() {
      this.$router.push("/jornadas");
    },
    async obtenerListadoJornadas() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerJornadas();
        this.listadoJornadas = respuesta.data;
        this.listadoJornadas.forEach((element) => {
          if (element.check_out != null) {
            //Calcular las horas de la jornada
            const minutos = moment(element.check_out).diff(
              moment(element.check_in),
              "m"
            );
            if (minutos > 60) {
              const horas = Math.floor(minutos / 60);
              const minutosRestantes = minutos % 60;
              element.hours = `${horas} horas y ${minutosRestantes} minutos`;
            } else {
              element.hours = `${minutos} minutos`;
            }
          }
        });
        this.listadoMostrarJornadas = this.listadoJornadas;
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al realizar la petición",
          });
        }
      }
      this.cargando = false;
    },
    async eliminarJornada(id) {
      this.cargando = true;
      try {
        await api.eliminarJornada(id);
        ElMessage.success({
          message: "Jornada eliminada correctamente",
        });
        this.obtenerListadoJornadas();
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al realizar la petición",
          });
        }
      }
      this.cargando = false;
    },
    filtroJornadas(dato, filtro) {
      let DATE_END, DATE_START;
      if (filtro == "date" && dato.date != null) {
        DATE_START = dato.date.toISOString();
        DATE_END = moment(dato.date).add(1, "days").toISOString();
      }
      switch (filtro) {
        case "name":
          // Seteando el valor da la fecha a nulo
          this.filtro.date = null;
          // Filtrando por nombre
          this.listadoMostrarJornadas = this.listadoJornadas.filter((jornada) =>
            jornada.employee.first_name
              .toLowerCase()
              .includes(dato.name.toLowerCase())
          );
          break;
        case "date":
          // Seteando el valor de name a vacio
          this.filtro.name = "";
          if (dato.date == null) {
            this.listadoMostrarJornadas = this.listadoJornadas;
            return;
          }
          // Filtrando por fecha
          this.listadoMostrarJornadas = this.listadoJornadas.filter(
            (jornada) => {
              return moment(jornada.check_in).isBetween(
                moment(DATE_START),
                moment(DATE_END),
                null,
                "[]"
              );
            }
          );
          break;
      }
    },
  },
};
</script>
<style lang=""></style>
