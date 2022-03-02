<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega una nueva jornada laboral"
    placement="top"
  >
    <el-button class="nueva-jornada" type="primary" v-on:click="nuevaJornada()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">
          &Uacute;ltimas jornadas laborales
        </p>
        <el-table
          v-loading.fullscreen.lock="cargando"
          :data="listadoUltimasJornadas"
          class="w-100"
          empty-text="No hay jornadas laborales registradas"
          max-height="400"
          ><el-table-column
            prop="employee.first_name"
            label="Empleado"
            min-width="180"
          >
          </el-table-column>
          <el-table-column prop="check_in_format" label="Entrada" width="200">
          </el-table-column
          ><el-table-column prop="check_out_format" label="Salida" width="200">
          </el-table-column>
        </el-table>
        <el-button
          class="d-block mx-auto my-3"
          v-on:click="listadoEmpleadosMetodo()"
          >Mostrar todos</el-button
        >
      </div>
      <div class="col-12 col-md-5 my-3">
        <p class="_text-bigger text-center">Jornadas en progreso</p>
        <ul class="list-group" v-if="listadoJornadasEnProgreso.length > 0">
          <li
            class="_light"
            v-for="(item, index) in listadoJornadasEnProgreso"
            :key="index"
          >
            {{ item.employee.first_name }} {{ item.employee.last_name }} -
            {{ item.check_in_format }}
          </li>
        </ul>
        <p class="text-center text-muted my-5" v-else>No hay registros</p>
      </div>
      <div class="col-12 my-3">
        <p class="_text-bigger text-center">Detalle de jornadas laborales</p>
        <div class="d-flex justify-content-center align-items-start">
          <div class="_w-40">
            <el-select
              v-model="idJornadaDetalle"
              placeholder="Seleccione jornada a estudiar"
              clearable
              filterable
              class="w-100 d-block mx-auto"
            >
              <el-option
                v-for="item in listadoJornadas"
                :key="item._id"
                :label="item.check_in_format + ' - ' + item.employee.first_name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="_w-60 py-2 px-3" v-if="jornadaSeleccionada != null">
            <p>
              {{ jornadaSeleccionada.employee.first_name }} 
              <span class="_bold">{{ jornadaSeleccionada.check_in_format }} </span>
              <span>{{ jornadaSeleccionada.check_out_format }}</span>
            </p>
            <div class="row">
              <div class="col-12 col-md-6 px-1 px-md-4 py-2">
                <GoogleMap
                  api-key="AIzaSyBS3Ui-nZifQQJs030dE46Poa_8cMLHfVU"
                  style="width: 100%; height: 100px;"
                  :center="jornadaSeleccionada.inCoordinates"
                  :zoom="15"
                >
                  <Marker
                    :options="{ position: jornadaSeleccionada.inCoordinates }"
                  />
                </GoogleMap>
              </div>
              <div class="col-12 col-md-6 px-1 px-md-4 py-2">
                <GoogleMap
                  api-key="AIzaSyBS3Ui-nZifQQJs030dE46Poa_8cMLHfVU"
                  style="width: 100%; height: 100px"
                  :center="jornadaSeleccionada.outCoordinates"
                  :zoom="15"
                >
                  <Marker
                    :options="{ position: jornadaSeleccionada.outCoordinates }"
                  />
                </GoogleMap>
              </div>
            </div>
          </div>
          <div class="_w-60 py-2 px-3" v-else>
            <p class="_light text-center">No hay seleccionado</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { GoogleMap, Marker } from "vue3-google-map";
export default {
  components: {
    GoogleMap,
    Marker,
    Plus,
  },
  data() {
    return {
      listadoUltimasJornadas: [],
      listadoJornadasEnProgreso: [],
      idJornadaEliminar: "",
      idJornadaDetalle: "",
      jornadaSeleccionada: null,
      listadoJornadas: [],
      cargando: false,
      coordenadas: {
        lat: 0,
        lng: 0,
      },
    };
  },
  watch: {
    idJornadaDetalle(val) {
      this.jornadaSeleccionada = this.listadoJornadas.find(
        (item) => item._id === val
      );
    },
  },
  mounted() {
    this.obtenerUltimasJornadas();
    this.obtenerJornadas();
    this.obtenerJornadasEnProceso();
  },
  methods: {
    nuevaJornada() {
      this.$router.push("/jornadas/nuevo");
    },
    async obtenerUltimasJornadas() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerUltimasJornadas();
        this.listadoUltimasJornadas = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
      this.cargando = false;
    },
    async obtenerJornadas() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerJornadas();
        this.listadoJornadas = respuesta.data;
        this.listadoJornadas.forEach((element) => {
          element.inCoordinates = {
            lat: element.inCoordinatesLat,
            lng: element.inCoordinatesLng,
          };
          element.outCoordinates = {
            lat: element.outCoordinatesLat,
            lng: element.outCoordinatesLng,
          };
        });
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
      this.cargando = false;
    },
    async obtenerJornadasEnProceso() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerJornadasEnProceso();
        this.listadoJornadasEnProgreso = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
      this.cargando = false;
    },
  },
  created() {
    this.$getLocation()
      .then((response) => {
        this.coordenadas = response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss">
.nueva-jornada {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>
