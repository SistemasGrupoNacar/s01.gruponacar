<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega un nuevo empleado"
    placement="top"
  >
    <el-button
      class="nuevo-empleado"
      type="primary"
      v-on:click="nuevoEmpleado()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-7 my-3">
        <p class="_text-bigger text-center">
          &Uacute;ltimos empleados contratados
        </p>
        <el-table
          v-loading.fullscreen.lock="cargando"
          :data="listadoUltimosEmpleados"
          class="w-100"
          max-height="400"
          ><el-table-column prop="first_name" label="Nombres" width="180">
          </el-table-column>
          <el-table-column
            prop="position.description"
            label="Cargo"
            min-width="200"
          >
          </el-table-column
          ><el-table-column prop="phone" label="Tel&eacute;fono" width="120">
          </el-table-column>
        </el-table>
        <el-button
          class="d-block mx-auto my-3"
          v-on:click="listadoEmpleadosMetodo()"
          >Mostrar todos</el-button
        >
      </div>
      <div class="col-12 col-md-5 my-3">
        <p class="_text-bigger text-center">Eliminaci&oacute;n de empleado</p>
        <el-select
          v-model="idEmpleadoEliminar"
          placeholder="Seleccione empleado a eliminar"
          clearable
          filterable
          class="w-100"
        >
          <el-option
            v-for="item in listadoEmpleados"
            :key="item._id"
            :label="item.first_name + ' ' + item.last_name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-button
          class="d-block mx-auto my-1"
          v-on:click="eliminarEmpleado(idEmpleadoEliminar)"
          >Eliminar</el-button
        >
      </div>
      <div class="col-12 my-3"></div>
    </div>
  </div>
</template>
<script>
import { Plus } from "@element-plus/icons-vue";
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      cargando: false,
      listadoUltimosEmpleados: [],
      listadoEmpleados: [],
      idEmpleadoEliminar: "",
    };
  },
  methods: {
    nuevoEmpleado() {
      this.$router.push("/empleados/nuevo");
    },
    listadoEmpleadosMetodo() {
      this.$router.push("/empleados/listado");
    },
    async obtenerUltimosEmpleados() {
      try {
        const response = await api.obtenerUltimosEmpleados();
        this.listadoUltimosEmpleados = response.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
    },
    async obtenerEmpleados() {
      try {
        const response = await api.obtenerEmpleados();
        this.listadoEmpleados = response.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al realizar la petición");
        }
      }
    },
    async eliminarEmpleado(dato) {
      this.cargando = true;
      try {
        await api.eliminarEmpleado(dato);
        ElMessage.success("Empleado eliminado");
        this.obtenerEmpleados();
        this.obtenerUltimosEmpleados();
        this.idEmpleadoEliminar = "";
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
  mounted() {
    this.cargando = true;
    this.obtenerUltimosEmpleados();
    this.obtenerEmpleados();
    this.cargando = false;
  },
};
</script>
<style lang="scss">
.nuevo-empleado {
  display: block;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 10;
}
</style>
