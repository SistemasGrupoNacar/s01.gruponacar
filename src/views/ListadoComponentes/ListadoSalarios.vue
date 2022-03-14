<template>
  <div class="container">
    <p class="_title">Listado de Salarios</p>
    <p class="_subtitle text-muted">
      Listado de salarios realizados en la empresa.
    </p>
    <el-main v-loading="cargando">
      <el-table :data="listadoSalarios" style="width: 100%" max-height="400">
        <el-table-column label="Empleado">
          <el-table-column
            prop="employee.first_name"
            label="Nombres"
            width="150"
          />
          <el-table-column
            prop="employee.last_name"
            label="Apellidos"
            width="150"
          />
        </el-table-column>
        <el-table-column prop="total_format" label="Monto" width="100" />
        <el-table-column prop="_id" label="ID" width="220" />
        <el-table-column
          prop="description"
          label="Descripci&oacute;n"
          min-width="100"
        />
        <el-table-column prop="date_format" label="Fecha" width="200" />
        <el-table-column
          prop="production._id"
          label="Producci&oacute;n"
          width="220"
        />
        <el-table-column fixed="right" label="Operaciones" width="120">
          <template #default="scope">
            <el-popconfirm
              confirm-button-text="Si"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#114B5F"
              title="¿Está seguro de eliminar este salario?"
              @confirm="eliminarSalario(scope.row._id)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="primary"
                  ><el-icon><Delete /> </el-icon>
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
export default {
  components: {
    Delete,
  },
  data() {
    return {
      listadoSalarios: [],
      cargando: false,
    };
  },
  methods: {
    async obtenerSalarios() {
      this.cargando = true;
      try {
        const respuesta = await api.obtenerSalarios();
        this.listadoSalarios = respuesta.data;
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al obtener los salarios");
        }
      }
      this.cargando = false;
    },
    async eliminarSalario(id) {
      this.cargando = true;
      try {
        await api.eliminarSalario(id);
        this.obtenerSalarios();
      } catch (error) {
        if (error.response) {
          ElMessage.error(error.response.data.message);
        } else {
          ElMessage.error("Error al eliminar el salario");
        }
      }
      this.cargando = false;
    },
  },
  mounted() {
    this.obtenerSalarios();
  },
};
</script>
<style lang=""></style>
