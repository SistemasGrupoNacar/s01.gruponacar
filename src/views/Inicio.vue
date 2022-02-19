<template>
  <el-main v-loading="cargando" class="container">
    <div class="_big-container">
      <p class="_bold text-muted">Grafica Ingresos-Egresos</p>
      <div class="_w-50">
        <grafica :datos="datos.graphic" />
      </div>
    </div>
    <div class="_big-container">
      <div class="_w-50">
        <div class="" v-if="datos.productsWithLessStock != null">
          <p class="_light my-0">Productos con poco stock</p>
          <el-tag
            class="my-2"
            type="warning"
            v-for="(item, index) in datos.productsWithLessStock"
            :key="index"
            size="large"
          >
            {{ item.name }} / (Disponible: {{ item.stock }} - Requerido:
            {{ item.min_stock }} )
          </el-tag>
        </div>
        <p class="_light" v-else>No hay carencias en inventario de insumos.</p>
        <hr />
        <div class="w-100">
          <p class="_light my-0">Ventas pendientes</p>
          <el-tag
            class="my-2"
            type="warning"
            v-for="(item, index) in datos.productsWithLessStock"
            :key="index"
            size="large"
          >
            {{ item._id }}
          </el-tag>
        </div>
        <hr />
      </div>
      <p class="_bold my-2 text-muted">Avisos</p>
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
        productsWithLessStock: null,
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

<style lang="scss"></style>
