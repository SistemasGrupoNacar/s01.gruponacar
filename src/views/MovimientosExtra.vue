<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega un nuevo movimiento extra"
    placement="top"
  >
    <el-button
      class="nuevo-extra"
      type="primary"
      v-on:click="nuevoMovimientoExtra()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>

  <div class="container py-2 px-1 px-lg-4">
    <p class="_title">Historial Movimientos Extra</p>
    <p class="_subtitle text-muted">
      Listado de movimientos extra tanto egresos como ingresos.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table
          :data="listadoHistorialMovimientosExtra"
          style="width: 100%"
          max-height="400"
        >
          <el-table-column prop="_id" label="ID" width="120" />
          <el-table-column
            prop="type_move.title_translate"
            label="Tipo"
            width="150"
          />
          <el-table-column prop="total_format" label="Total" width="120" />
          <el-table-column prop="date_format" label="Fecha" width="150" />
          <el-table-column
            prop="description"
            label="Descripción"
            min-width="250"
          />
          <el-table-column fixed="right" label="Operacion" width="100">
            <template #default="scope">
              <el-button type="" v-on:click="eliminarMovimientoExtra(scope.row)"
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
import { Plus, Delete } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { verificarSesion } from "@/scripts/Sesion.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
    Delete,
  },
  data() {
    return {
      listadoHistorialMovimientosExtra: [],
      cargando: false,
    };
  },
  mounted() {
    this.obtenerHistorialMovimientosExtra();
  },
  methods: {
    async obtenerHistorialMovimientosExtra() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosMovimientosExtra();
        this.listadoHistorialMovimientosExtra = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los movimientos extra");
        }
      }
      this.cargando = false;
    },
    nuevoMovimientoExtra() {
      this.$router.push("/movimientos/extra/nuevo");
    },
    async eliminarMovimientoExtra(data) {
      this.cargando = true;
      try {
        const respuesta = await api.eliminarMovimientoExtra(data._id);
        this.obtenerHistorialMovimientosExtra();
        ElMessage({
          message: `El movimiento '${respuesta.data._id}' ha sido eliminado`,
          type: "success",
        });
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el movimiento extra");
        }
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang="scss">
.nuevo-extra {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>
