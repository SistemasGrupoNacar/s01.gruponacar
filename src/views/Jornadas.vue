<template>
  <!--el-tooltip
    class="box-item"
    effect="light"
    content="Agrega una nueva jornada laboral"
    placement="top"
  >
    <el-button class="nueva-jornada" type="primary" v-on:click="nuevaJornada()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </-el-tooltip-->
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">Detalle de jornadas</p>
        <p class="_text-small text-center my-0">
          Gr&aacute;fico cantidad de jornadas trabajadas
        </p>
        <grafica :datos="jornadasEmpleados" class="px-3 py-2" />

        <el-button class="d-block mx-auto my-3" v-on:click="listadoJornadas()"
          >Mostrar todos</el-button
        >
      </div>
      <div class="col-12 col-md-5 my-3">
        <p class="_text-bigger text-center">Jornadas en progreso</p>
        <div v-if="listadoJornadasEnProgreso.length > 0">
          <div v-for="(item, index) in listadoJornadasEnProgreso" :key="index">
            <div class="row">
              <div class="col-4 _semi-bold">
                {{ item.employee.first_name }}
              </div>
              <div class="col-8">
                <p>
                  Hora ingreso: <span>{{ item.check_in_format }}</span>
                </p>
              </div>
            </div>
            <el-button
              class="mx-auto d-block"
              v-on:click.prevent="finalizarJornada(jornada, item.employee._id)"
              >Terminar jornada laboral</el-button
            >
            <hr />
          </div>
        </div>
        <p class="text-center text-muted my-5" v-else>No hay registros</p>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import Grafica from "@/components/GraficaPastel.vue";
export default {
  components: {
    Grafica,
  },
  data() {
    return {
      listadoJornadasEnProgreso: [],
      idJornadaEliminar: "",
      jornadasEmpleados: [],
      cargando: false,
      jornada: {
        check_out: null,
        coordinates: {
          lat: null,
          lng: null,
        },
      },
    };
  },
  watch: {},
  mounted() {
    this.obtenerJornadasEnProceso();
    this.obtenerGraficoDeJornadas();
  },
  methods: {
    nuevaJornada() {
      this.$router.push("/jornadas/nuevo");
    },
    listadoJornadas() {
      this.$router.push("/jornadas/listado");
    },

    async obtenerGraficoDeJornadas() {
      try {
        const respuesta = await api.obtenerGraficaJornadas();
        this.jornadasEmpleados = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
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
    async finalizarJornada(jornada, empleado) {
      this.cargando = true;
      this.$getLocation()
        .then(async (response) => {
          jornada.coordinates = response;
          jornada.check_out = new Date().toISOString();
          try {
            await api.finalizarJornada(jornada, empleado);

            this.obtenerJornadasEnProceso();
            this.obtenerUltimasJornadas();
          } catch (error) {
            if (error.response) {
              ElMessage.error(error.response.data.message);
            } else {
              ElMessage.error("Error al realizar la petición");
            }
          }
        })
        .catch(() => {
          ElMessage.error("Error al obtener la ubicación");
        });
      this.cargando = false;
    },
  },
  created() {},
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
