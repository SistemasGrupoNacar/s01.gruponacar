<template>
  <div class="container">
    <p class="_title">Listado de Jornadas</p>
    <p class="_subtitle text-muted">
      Listado de jornadas laborales de la empresa.
      <el-main v-loading.fullscreen.lock="cargando">
        <div class="min-h-50">
          <el-table :data="listadoJornadas" style="width: 100%">
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
                    <p class="my-1">
                      Entrada -
                      <span class="_letter-spacing-1 _semi-bold">
                        {{ props.row.check_in_format }}
                      </span>
                    </p>
                    <p v-if="props.row.check_out != null" class="my-1">
                      Salida -
                      <span class="_letter-spacing-1 _semi-bold">
                        {{ props.row.check_out_format }}
                      </span>
                    </p>
                    <p class="my-1" v-if="props.row.hours">
                      Tiempo trabajado -
                      <span class="_letter-spacing-1 _semi-bold">
                        {{ props.row.hours }}
                      </span>
                    </p>
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
                      <div class="col-6 d-flex align-items-center justify-content-center"  v-else>
                          <p class=" _bold">La jornada sigue en proceso.</p>
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
    </p>
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

  data() {
    return {
      cargando: false,
      listadoJornadas: [],
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
  },
};
</script>
<style lang=""></style>
