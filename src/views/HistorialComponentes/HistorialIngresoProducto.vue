<template>
  <div class="container">
    <p class="_title">Historial Productos</p>
    <p class="_subtitle text-muted">
      Listado de ingresos de productos al sistema (Cosechas).
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialCosecha"
          style="width: 100%"
          max-height="400"
        >
          <el-table-column prop="_id" label="ID" width="120" />
          <el-table-column
            prop="product.name"
            label="Producto"
            min-width="170"
          />
          <el-table-column
            prop="production._id"
            label="Producción"
            width="150"
          />
          <el-table-column prop="quantity" label="Cantidad" width="90" />
          <el-table-column prop="date_format" label="Fecha" min-width="150" />
          <el-table-column
            prop="description"
            label="Descripción"
            min-width="150"
          />
          <el-table-column fixed="right" label="Operacion" width="100">
            <template #default="scope">
              <el-button type="primary" v-on:click="eliminarCosecha(scope.row)"
                ><el-icon><Delete /> </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import { Delete } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { verificarSesion } from "@/scripts/Sesion.js";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      cargando: true,
      listadoHistorialCosecha: [],
    };
  },
  components: {
    Delete,
  },
  methods: {
    async obtenerHistorialCosecha() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosHistorialCosecha();
        this.listadoHistorialCosecha = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener el historial de cosechas.");
        }
      }
      this.cargando = false;
    },
    async eliminarCosecha(data) {
      try {
        await api.eliminarHistorialCosecha(data._id);
        this.obtenerHistorialCosecha();
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el historial de cosecha.");
        }
      }
    },
  },
  mounted() {
    this.obtenerHistorialCosecha();
  },
};
</script>
<style lang="scss"></style>
