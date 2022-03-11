<template>
  <el-tooltip
    class="box-item"
    effect="light"
    content="Agrega un nuevo salario"
    placement="top"
  >
    <el-button class="_nuevo" type="primary" v-on:click="nuevoSalario()"
      ><el-icon><Plus /> </el-icon>
    </el-button>
  </el-tooltip>
  <div class="container">
    <div class="row">
      <div class="col-12 my-2">
        <p class="_text-bigger">&Uacute;ltimos Salarios</p>
        <el-table
          v-loading.fullscreen.lock="cargando"
          :data="listadoUltimosSalarios"
          class="w-100"
          max-height="400"
          ><el-table-column
            prop="employee.first_name"
            label="Empleado"
            width="230"
          >
          </el-table-column
          ><el-table-column prop="amount_format" label="Monto" width="150">
          </el-table-column>
          <el-table-column
            prop="description"
            label="Observaciones"
            min-width="200"
          >
          </el-table-column
          ><el-table-column prop="_id" label="ID" width="230"> </el-table-column
          ><el-table-column prop="date_format" label="Fecha" width="180">
          </el-table-column>
        </el-table>
        <el-button
          class="d-block mx-auto my-3"
          v-on:click="listadoSalariosMetodo()"
          >Mostrar todos</el-button
        >
      </div>
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
      listadoUltimosSalarios: [],
      cargando: false,
    };
  },
  mounted() {
    this.obtenerListadoUltimosSalarios();
  },
  methods: {
    async obtenerListadoUltimosSalarios() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerUltimosSalarios();
        this.listadoUltimosSalarios = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error({
            message: error.response.data.message,
          });
        } else {
          ElMessage.error({
            message: "Error al obtener listado de últimos salarios",
          });
        }
      }
      this.cargando = false;
    },
    listadoSalariosMetodo() {
      this.$router.push("/salarios/listado");
    },
    nuevoSalario() {
      this.$router.push("/salarios/nuevo");
    },
  },
};
</script>
<style lang=""></style>
