<template>
  <div class="container">
    <p class="_title">Historial Insumos</p>
    <p class="_subtitle text-muted">
      Listado de ingresos de insumos al sistema.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialEntradaInsumos"
          style="width: 100%"
          max-height="700"
        >
          <el-table-column prop="_id" label="ID" width="200" />
          <el-table-column
            prop="inventory_product.name"
            label="Producto"
            width="200"
          />

          <el-table-column prop="quantity" label="Cantidad" width="90" />

          <el-table-column
            prop="unit_price_format"
            label="Precio Unitario"
            width="120"
          />
          <el-table-column prop="total_format" label="Total" width="120" />
          <el-table-column prop="date_format" label="Fecha" min-width="150" />

          <el-table-column fixed="right" label="Operacion" width="100">
            <template #default="scope">
              <el-button
                type="primary"
                v-on:click="eliminarEntradaInsumo(scope.row)"
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
      listadoHistorialEntradaInsumos: [],
    };
  },
  components: {
    Delete,
  },
  mounted() {
    this.obtenerHistorialEntradaInsumos();
  },
  methods: {
    async obtenerHistorialEntradaInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosHistorialEntradaInsumos();
        this.listadoHistorialEntradaInsumos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener las entradas de insumos");
        }
      }
      this.cargando = false;
    },
    async eliminarEntradaInsumo(item) {
      try {
        await api.eliminarEntradaInsumo(item._id);
        this.obtenerHistorialEntradaInsumos();
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar la entrada de insumo");
        }
      }
    },
  },
};
</script>
<style lang="scss"></style>
