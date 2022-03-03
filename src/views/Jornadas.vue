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
          v-on:click="listadoJornadas()"
          >Mostrar todos</el-button
        >
      </div>
      <div class="col-12 col-md-5 my-3">
        <p class="_text-bigger text-center">Jornadas en progreso</p>
        <ul class="mx-2" v-if="listadoJornadasEnProgreso.length > 0">
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
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
//import { GoogleMap, Marker } from "vue3-google-map";
export default {
  components: {
    //GoogleMap,
    //Marker,
    Plus,
  },
  data() {
    return {
      listadoUltimasJornadas: [],
      listadoJornadasEnProgreso: [],
      idJornadaEliminar: "",
      cargando: false,
    };
  },
  watch: {},
  mounted() {
    this.obtenerUltimasJornadas();
    this.obtenerJornadasEnProceso();
  },
  methods: {
    nuevaJornada() {
      this.$router.push("/jornadas/nuevo");
    },
    listadoJornadas(){
      this.$router.push("/jornadas/listado");
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
    /*this.$getLocation()
      .then((response) => {
        this.coordenadas = response;
      })
      .catch((error) => {
        console.log(error);
      });*/
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
