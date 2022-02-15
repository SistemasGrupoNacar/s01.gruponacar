<template>
  <el-main v-loading="cargando" class="container">
    <p class="_title">GRUPO NACAR</p>
    <div class="row">
      <div class="col-12 col-md-4">
        <grafica :datos="datos.graphic" />
      </div>
    </div>
  </el-main>
</template>

<script>
import Grafica from "@/components/Grafica.vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { verificarSesion } from "@/scripts/Sesion.js";
export default {
  name: "Inicio",
  components: {
    Grafica,
  },
  data() {
    return {
      cargando: false,
      datos: {
        graphic: null,
      },
    };
  },
  mounted() {
    this.obtenerDatosPanel();
  },
  methods: {
    async obtenerDatosPanel() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerDatosPanel();
        this.datos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición, intente nuevamente.");
        }
      }
      this.cargando = false;
    },
  },
};
</script>
