<template>
  <el-page-header
    class="my-3"
    content="Listado de Insumos"
    @back="irInsumos()"
  />
  <hr />
  <div class="">
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="min-h-50">
        <el-table :data="listadoInsumos" style="width: 100%" max-height="500">
          <el-table-column prop="name" label="Nombre" width="150" />
          <el-table-column prop="_id" label="ID" width="180" />
          <el-table-column prop="stock" label="Stock" width="100" />
          <el-table-column
            prop="min_stock"
            label="Stock M&iacute;nimo"
            width="150"
          />
          <el-table-column prop="cost_format" label="Costo" width="100" />
          <el-table-column
            prop="description"
            label="Descripción"
            min-width="150"
          />
          <el-table-column
            prop="availability_text"
            label="Disponibilidad"
            width="140"
          />
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template #default="scope">
              <el-button
                type=""
                v-on:click="cambiarDisponibilidadInsumo(scope.row)"
                v-if="scope.row.availability"
                ><el-icon><Remove /> </el-icon> </el-button
              ><el-button
                type=""
                v-on:click="cambiarDisponibilidadInsumo(scope.row)"
                v-else
                ><el-icon><Check /> </el-icon>
              </el-button>
              <el-button type="primary" v-on:click="eliminarInsumo(scope.row)"
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
import { Remove, Delete, Check } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { verificarSesion } from "@/scripts/Sesion.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Remove,
    Delete,
    Check,
  },
  data() {
    return {
      cargando: false,
      listadoInsumos: [],
    };
  },
  mounted() {
    this.obtenerInsumos();
  },
  methods: {
    async obtenerInsumos() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerTodosInsumos();
        this.listadoInsumos = respuesta.data;
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los insumos.");
        }
      }
      this.cargando = false;
    },
    async cambiarDisponibilidadInsumo(data) {
      try {
        const respuesta = await api.cambiarDisponibilidadInsumo(
          data._id,
          !data.availability
        );
        if (respuesta.status === 200) {
          this.obtenerInsumos();
        }
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al cambiar la disponibilidad del insumo.");
        }
      }
    },
    irInsumos() {
      this.$router.push("/inventario/insumos");
    },
    async eliminarInsumo(data) {
      try {
        await api.eliminarInsumo(data._id);
        this.obtenerInsumos();
      } catch (error) {
        if (error.response) {
          verificarSesion(error);
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el insumo.");
        }
      }
    },
  },
};
</script>
<style lang=""></style>
