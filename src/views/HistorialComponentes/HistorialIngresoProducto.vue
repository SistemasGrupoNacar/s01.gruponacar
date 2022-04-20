<template>
  <el-page-header
    class="my-3"
    content="Historial de Cosechas"
    @back="irProductos()"
  />
  <hr />
  <div>
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialCosecha"
          style="width: 100%"
          max-height="400"
        >
          <el-table-column
            prop="product.name"
            label="Producto"
            min-width="220"
          />
          <el-table-column prop="quantity" label="Cantidad" width="100" />
          <el-table-column
            prop="product.unit_of_measurement"
            label="Medida"
            width="100"
          />
          <el-table-column prop="date_format" label="Fecha" width="180" />
          <el-table-column
            prop="description"
            label="Descripción"
            min-width="220"
          />
          <el-table-column
            prop="production._id"
            label="Producción"
            width="220"
          />
          <el-table-column prop="_id" label="ID" width="220" />
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
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el historial de cosecha.");
        }
      }
    },
    irProductos() {
      this.$router.push("/inventario/productos");
    },
  },
  mounted() {
    this.obtenerHistorialCosecha();
  },
};
</script>
<style lang="scss"></style>
