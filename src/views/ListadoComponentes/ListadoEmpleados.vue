<template>
  <el-page-header
    class="my-3"
    content="Listado de Empleados"
    @back="irEmpleados()"
  />
  <hr />
  <div class="">
    <el-main v-loading.fullscreen.lock="cargando">
      <div class="min-h-50">
        <el-table :data="listadoEmpleados" style="width: 100%" max-height="400">
          <el-table-column prop="first_name" label="Nombres" width="150" />
          <el-table-column prop="last_name" label="Apellidos" width="150" />
          <el-table-column prop="_id" label="ID" width="200" />
          <el-table-column prop="dui" label="Dui" width="100" />
          <el-table-column prop="phone" label="Tel&eacute;fono" width="100" />
          <el-table-column prop="email" label="Correo" width="250" />
          <el-table-column prop="journeys_count" label="Jornadas" width="100" />
          <el-table-column prop="is_active_format" label="Estado" width="140" />
          <el-table-column fixed="right" label="Operaciones" width="150">
            <template #default="scope">
              <el-button
                type=""
                v-on:click="cambiarEstadoEmpleado(scope.row)"
                v-if="scope.row.is_active"
                ><el-icon><Remove /> </el-icon> </el-button
              ><el-button
                type=""
                v-on:click="cambiarEstadoEmpleado(scope.row)"
                v-else
                ><el-icon><Check /> </el-icon>
              </el-button>
              <el-button type="primary" v-on:click="eliminarEmpleado(scope.row)"
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
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { Remove, Delete, Check } from "@element-plus/icons-vue";
export default {
  components: {
    Remove,
    Delete,
    Check,
  },
  data() {
    return {
      listadoEmpleados: [],
      cargando: false,
    };
  },
  mounted() {
    this.obtenerEmpleados();
  },
  methods: {
    irEmpleados() {
      this.$router.push("/empleados");
    },
    async obtenerEmpleados() {
      this.cargando = true;
      try {
        const response = await api.obtenerEmpleadosTodos();
        this.listadoEmpleados = response.data;
        this.listadoEmpleados.forEach((element) => {
          element.journeys_count = element.journeys.length;
        });
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error("Error al obtener los datos");
        }
      }
      this.cargando = false;
    },
    async cambiarEstadoEmpleado(dato) {
      this.cargando = true;
      try {
        await api.cambiarEstadoEmpleado(dato._id, !dato.is_active);
        ElMessage.success("Empleado actualizado");
        this.obtenerEmpleados();
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error("Error al actualizar el empleado");
        }
      }
      this.cargando = false;
    },
    async eliminarEmpleado(dato) {
      this.cargando = true;
      try {
        await api.eliminarEmpleado(dato._id);
        ElMessage.success("Empleado eliminado o inactivo");
        this.obtenerEmpleados();
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error("Error al eliminar el empleado");
        }
      }
      this.cargando = false;
    },
  },
};
</script>
<style lang=""></style>
