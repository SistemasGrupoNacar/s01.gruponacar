<template>
  <el-page-header
    class="my-3"
    content="Historial de Entrada de Insumos"
    @back="irInsumos()"
  />
  <hr />
  <div>
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialEntradaInsumos"
          style="width: 100%"
          max-height="500"
        >
          <el-table-column
            prop="inventory_product.name"
            label="Producto"
            min-width="200"
          />

          <el-table-column prop="quantity" label="Cantidad" width="100" />
          <el-table-column
            prop="inventory_product.unit_of_measurement"
            label="Medida"
            width="100"
          />

          <el-table-column
            prop="unit_price_format"
            label="Precio Unitario"
            width="120"
          />
          <el-table-column prop="total_format" label="Total" width="120" />
          <el-table-column prop="date_format" label="Fecha" width="180" />
          <el-table-column prop="_id" label="ID" width="220" />
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
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar la entrada de insumo");
        }
      }
    },
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
  },
};
</script>
<style lang="scss"></style>
